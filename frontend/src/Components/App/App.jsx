import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Lista from '../List/List';
import "./app.css";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Registration from '../Registration/Registration';
import Product from "../Product/Product";
import Add from "../Add/Add";
import Cart from "../Cart/Cart";
import Change from "../Change/Change";
import MyAds from "../MyAds/MyAds";
import OrderList from "../Orders/OrderList";
import OrderDetails from '../Orders/Orders';

function App() {
  const isLoggedIn = localStorage.getItem('authTokens') !== null;
  const username = localStorage.getItem('username') || ""; // Felhasználónév lekérdezése a localStorage-ből

    const [cart, setCart] = useState(() => {
        // Inicializáljuk a cart-ot a bejelentkezett felhasználó alapján
        const savedCart = localStorage.getItem(`cart_${username}`);
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (item) => {
        setCart(prevCart => {
            // Megkeressük, hogy van-e már ilyen elem a kosárban
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);

            // Ha van ilyen elem, akkor frissítjük a mennyiségét
            const updatedCart = existingItem
                ? prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                        : cartItem
                )
                // Ha nincs ilyen elem, akkor hozzáadjuk az új elemet a kosárhoz
                : [...prevCart, { ...item, quantity: 1 }];

            // Elmentjük az új állapotot a localStorage-be, felhasználónév alapján
            localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));

            // Visszatérünk az új kosár állapottal
            return updatedCart;
        });
    };


  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Főoldal</Link>
          {!isLoggedIn && <Link to="/login">Bejelentkezés</Link>}
          {isLoggedIn && <Logout />}
          <AddLink isLoggedIn={isLoggedIn} />
          <CartLink isLoggedIn={isLoggedIn} />
          {isLoggedIn && <Link to="/MyAds">Hirdetéseim</Link>}
          {isLoggedIn && <Link to="/Orders">Rendeléseim</Link>}
        </nav>
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
          <Route path="/add" element={<Add />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/MyAds" element={<MyAds />} />
          <Route path="/Change/:id" element={<Change />} />
          <Route path="/Orders" element={<OrderList />} />
          <Route path="/order-details" element={<OrderDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

const CartLink = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    e.preventDefault(); // Megakadályozza a Link alapértelmezett viselkedését

    if (!isLoggedIn) {
      navigate('/login'); // Átirányítás a bejelentkezési oldalra, ha nem bejelentkezett
      alert('A kosár funkció használatához be kell jelentkezned!')
    } else {
      navigate('/cart'); // Kosár oldalra navigálás, ha bejelentkezett
    }
  };

  return (
    <a href="#" onClick={handleCartClick} className="nav-link">
      Kosár
    </a>
  );
};

const AddLink = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleAddClick = (e) => {
    e.preventDefault(); // Megakadályozza a Link alapértelmezett viselkedését

    if (!isLoggedIn) {
      navigate('/login'); // Átirányítás a bejelentkezési oldalra, ha nem bejelentkezett
      alert('A hirdetésfeladáshoz be kell jelentkezned!')
    } else {
      navigate('/add'); // Kosár oldalra navigálás, ha bejelentkezett
    }
  };

  return (
    <a href="#" onClick={handleAddClick} className="nav-link">
      Hirdetésfeladás
    </a>
  );
};

export default App;
