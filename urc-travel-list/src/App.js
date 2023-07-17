import "./index.css";
import { useState } from "react";

function App() {
  //INFO: UseState
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handDeleteItem(id) {
    setItems((items) => items.filter((i) => i.id != id));
  }

  function handleOnPacked(item) {
    setItems((items) =>
      items.map((i) => {
        if (i.id === item.id) {
          return { ...i, packed: !item.packed };
        } else {
          return i;
        }
      })
    );
  }

  function handleOnClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems((items) => []);
  }

  return (
    <>
      <Header></Header>
      <Form handleAddItem={handleAddItem}></Form>
      <PackingList
        items={items}
        onDeleteItem={handDeleteItem}
        onPacked={handleOnPacked}
        onClearList={handleOnClearList}
      ></PackingList>
      <Stats items={items}></Stats>
    </>
  );
}

function Header() {
  return <h1>Travel List</h1>;
}

function Form({ handleAddItem }) {
  // INFO: Controlled Elements
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleOnSubmit(event) {
    event.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleOnSubmit}>
      <h3> Add item to you travel list</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {[...Array(20).keys()].map((key) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onPacked, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItem;

  switch (sortBy) {
    case "input":
      sortedItem = items;
      break;
    case "packed":
      sortedItem = items.slice().sort((a, b) => +a.packed - +b.packed);
      break;
    default:
      break;
  }

  return (
    <div className="list">
      <ul>
        {sortedItem.map((i) => (
          <Item
            item={i}
            key={i.id}
            onDeleteItem={onDeleteItem}
            onPacked={onPacked}
          ></Item>
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onPacked }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onPacked(item)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} <span></span>
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const itemsCount = items.length;
  const packedItemCount = items.filter((i) => i.packed).length;
  const packedPercentage = itemsCount
    ? Math.round((packedItemCount / itemsCount) * 100)
    : 0;
  console.log("🚀 ~ file: App.js:112 ~ Stats ~ itemsCount:", itemsCount);
  return (
    <footer className="stats">
      <em>
        You have {itemsCount} numbers of items, and you have already packed{" "}
        {packedItemCount} ({packedPercentage}%)
      </em>
    </footer>
  );
}

export default App;
