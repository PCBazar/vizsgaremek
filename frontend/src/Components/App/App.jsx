import React, { useState } from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate,} from "react-router-dom";
import Lista from "../List/List";
import "./app.css";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Registration from "../Registration/Registration";
import Product from "../Product/Product";
import Add from "../Add/Add";
import Cart from "../Cart/Cart";
import Change from "../Change/Change";
import MyAds from "../MyAds/MyAds";
import OrderList from "../Orders/OrderList";
import OrderDetails from "../Orders/Orders";
import CartLink from "../ProtectedLink/CartLink";
import AddLink from "../ProtectedLink/AddLink";
import { CartProvider } from "../Cart/CartContext";

function App() {
  const isLoggedIn = localStorage.getItem("authTokens") !== null;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CartProvider>
    <div className="App">
      <Router>
        <div className="nav-container">
          <nav>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}> ☰ </button> 
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/">Főoldal</Link>
            {!isLoggedIn && <Link to="/login">Bejelentkezés</Link>}
            {isLoggedIn && <Logout />}
            <AddLink isLoggedIn={isLoggedIn} />
            <CartLink isLoggedIn={isLoggedIn} />
            {isLoggedIn && <Link to="/MyAds">Hirdetéseim</Link>}
            {isLoggedIn && <Link to="/Orders">Rendeléseim</Link>}
            </div>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route
            path="/login"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Registration />
              </PublicRoute>
            }
          />
          <Route
            path="/product/:id"
            element={<Product  />}
          />
          <Route
            path="/add"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Add />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Cart  />
              </PrivateRoute>
            }
          />
          <Route
            path="/MyAds"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <MyAds />
              </PrivateRoute>
            }
          />
          <Route
            path="/Change/:id"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Change />
              </PrivateRoute>
            }
          />
          <Route
            path="/Orders"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <OrderList />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-details"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <OrderDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  </CartProvider>
  );
}
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? children : <Navigate to="/" replace />;
};
export default App;