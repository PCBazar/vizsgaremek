import React, { useState } from "react";
import {BrowserRouter as Router,Route,Routes,Link,useNavigate,Navigate,} from "react-router-dom";
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
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const isLoggedIn = localStorage.getItem("authTokens") !== null;
  const username = localStorage.getItem("username") || ""; // Felhasználónév lekérdezése a localStorage-ből

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(`cart_${username}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      const updatedCart = existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }];

      localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="App">
      <Router>
        <div className="nav-container">
          <nav>
            <Link to="/">Főoldal</Link>
            {!isLoggedIn && <Link to="/login">Bejelentkezés</Link>}
            {isLoggedIn && <Logout />}
            <AddLink isLoggedIn={isLoggedIn} />
            <CartLink isLoggedIn={isLoggedIn} />
            {isLoggedIn && <Link to="/MyAds">Hirdetéseim</Link>}
            {isLoggedIn && <Link to="/Orders">Rendeléseim</Link>}
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
            element={<Product addToCart={addToCart} />}
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
                <Cart cart={cart} setCart={setCart} />
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
  );
}

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? children : <Navigate to="/" replace />;
};

const CustomModal = ({ isOpen, onClose, message }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onClose(); // Modal bezárása
    navigate("/login"); // Navigáció a bejelentkezéshez
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Figyelmeztetés"
      className="modal"
      overlayClassName="overlay"
    >
      <p>{message}</p>
      <button onClick={handleLoginClick}>Bejelentkezés</button>
      <button onClick={onClose}>Bezárás</button>
    </Modal>
  );
};

const CartLink = ({ isLoggedIn }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setModalOpen(true);
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <a href="#" onClick={handleCartClick} className="nav-link">
        Kosár
      </a>
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message="A Kosár funkció használatához be kell jelentkezned!"
      />
    </>
  );
};

const AddLink = ({ isLoggedIn }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setModalOpen(true);
    } else {
      navigate("/add");
    }
  };

  return (
    <>
      <a href="#" onClick={handleAddClick} className="nav-link">
        Hirdetésfeladás
      </a>
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message="A hirdetésfeladáshoz be kell jelentkezned!"
      />
    </>
  );
};

export default App;
