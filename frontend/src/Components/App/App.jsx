import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Lista from '../List/List';
import "./app.css";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Registration from '../Registration/Registration';
import Product from "../Product/Product";
import Add from "../Add/Add";

function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const isLoggedIn = localStorage.getItem('authTokens') !== null;

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/GetAll/')
      .then(response => response.json())
      .then(data => {
        setItems(data.products);
        setCategories(data.category);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Főoldal</Link>
          {!isLoggedIn && <Link to="/login">Bejelentkezés</Link>}
          {isLoggedIn && <Logout />}
          <Link to="/add">Hirdetésfeladás</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/product/:id" element={<Product items={items} />} />
          <Route path="/add" element={<Add categories={categories} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
