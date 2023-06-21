import "./App.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name}></Pizza>
        ))}
      </ul>
    </main>
  );
}

function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) {
  //   return null;
  // }
  // pizza.sold - out;
  // {`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
  return (
    //  <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}></li>
    <li className={pizzaObj.soldOut ? "pizza sold-out" : "pizza"}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients} </p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>FAST REACT PIZZA CO.</h1>
    </header>
  );
}

function Footer() {
  var shopOpens = parseInt("06", 10);
  var shopCloses = parseInt("20", 10);
  var isShopOpen =
    new Date().getHours() > shopOpens && new Date().getHours() < shopCloses;

  return (
    <footer className="footer">
      {/* // INFO: Conditional Rendering using ternary operator
      {isShopOpen ? (
        <h4>We're open from 12:00 to 22:00. Come visit us or order online.</h4>
      ) : (
        <h4>CLOSED</h4>
      )}
    */}
      {isShopOpen && (
        // INFO: Conditional Rendering using &&
        <h4>We're open from 12:00 to 22:00. Come visit us or order online.</h4>
      )}
    </footer>
  );
}

function App() {
  return (
    <div className="container">
      <Header></Header>
      <Menu></Menu>
      <Footer></Footer>
    </div>
  );
}

export default App;
