import React, { useEffect, useState } from 'react';
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

function App() {
  const [categories, setCategories] = useState([]);
  const isLoggedIn = localStorage.getItem('authTokens') !== null;
  const [cart, setCart] = useState(() => {
    // Inicializáljuk a cart-ot a localStorage-ból
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/GetAll/')
      .then(response => response.json())
      .then(data => {
        setCategories(data.category);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      const updatedCart = existingItem
        ? prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
        : [...prevCart, { ...item, quantity: 1 }];

      // Frissítjük a localStorage-t az új állapottal
      localStorage.setItem('cart', JSON.stringify(updatedCart));

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
          <Link to="/add">Hirdetésfeladás</Link>
          <CartLink isLoggedIn={isLoggedIn} />
          {isLoggedIn && <Link to="/MyAds">Hirdetéseim</Link>}
          {isLoggedIn && <Link to="/Orders">Rendeléseim</Link>}
        </nav>
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
          <Route path="/add" element={<Add categories={categories} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/MyAds" element={<MyAds />} />
          <Route path="/Change/:id" element={<Change />} />
          <Route path="/Orders" element={<OrderList />} />
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

export default App;
