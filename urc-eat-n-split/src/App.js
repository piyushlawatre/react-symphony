import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/900?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/900?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/900?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(true);
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriendList((friendList) => [...friendList, friend]);
    setShowAddFriend(!showAddFriend);
  }

  function handleSelectFriend(friend) {
    setSelectFriend((currentSelectedFriend) =>
      currentSelectedFriend?.id === friend?.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriendList((friendList) =>
      friendList.map((friend) =>
        friend.id === selectFriend.id
          ? { ...friend, balance: friend.balance + value }
          : { ...friend }
      )
    );
    setSelectFriend(null);
    console.log("🚀 ~ file: App.js:46 ~ handleSplitBill ~ value:", value);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendList={friendList}
          onSelectFriend={handleSelectFriend}
          selectFriend={selectFriend}
        ></FriendList>
        {showAddFriend && (
          <FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectFriend && (
        <FormSplitBill
          selectFriend={selectFriend}
          onSplitBill={handleSplitBill}
        ></FormSplitBill>
      )}
    </div>
  );
}

function FriendList({ friendList, onSelectFriend, selectFriend }) {
  return (
    <ul>
      {friendList.map((friend) => (
        <Friend
          friendDetail={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectFriend={selectFriend}
        ></Friend>
      ))}
    </ul>
  );
}

function Friend({ friendDetail, onSelectFriend, selectFriend }) {
  const isSelected = friendDetail.id === selectFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friendDetail.image} alt={friendDetail.name}></img>
      <h3>{friendDetail.name}</h3>
      {friendDetail.balance < 0 && (
        <p className="red">
          {" "}
          You owe {friendDetail.name} {Math.abs(friendDetail.balance)}₹
        </p>
      )}

      {friendDetail.balance > 0 && (
        <p className="green">
          {friendDetail.name} owes you {Math.abs(friendDetail.balance)}₹
        </p>
      )}
      {friendDetail.balance === 0 && (
        <p>You & {friendDetail.name} are settled up</p>
      )}
      <Button onClick={(e) => onSelectFriend(friendDetail)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  //INFO: Controlled Elements
  const id = crypto.randomUUID();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/900");
  //INFO: ---------------End
  function handleOnSubmit(e) {
    e.preventDefault();
    if (!name || !imageUrl) return;
    const newFriend = {
      id,
      name,
      image: `${imageUrl}?id=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImageUrl("https://i.pravatar.cc/900");
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleOnSubmit(e)}>
      <label>👨‍❤️‍💋‍👨Friend name</label>
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />

      <label value="image-url">🌄Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [billPayer, setBillPayer] = useState("You");
  const friendsExpense = Math.abs(billValue - yourExpense);

  function handleOnSubmit(event) {
    event.preventDefault();
    if (!billValue || !yourExpense || !billPayer) return;

    if (billPayer === "You") {
      onSplitBill(+friendsExpense);
    } else {
      onSplitBill(-yourExpense);
    }
  }

  return (
    <form className="form-split-bill" onSubmit={(e) => handleOnSubmit(e)}>
      <h2>Split A Bill With {selectFriend.name}</h2>

      <label>💰Bill Value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(+e.target.value)}
      />

      <label>🙋🏽‍♂️Your Expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            +e.target.value > billValue ? yourExpense : +e.target.value
          )
        }
      />

      <label>👨‍❤️‍💋‍👨{selectFriend.name}'s Expense </label>
      <input type="text" value={friendsExpense} disabled={true} />

      <label>🤑Who Is Paying The Bill</label>
      <select value={billPayer} onChange={(e) => setBillPayer(e.target.value)}>
        <option value="You">You</option>
        <option value={selectFriend.name}>{selectFriend.name}</option>
      </select>
      <Button>Spit Bill</Button>
    </form>
  );
}
