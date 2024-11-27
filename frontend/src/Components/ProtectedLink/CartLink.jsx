import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";

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
        <LoginModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          message="A Kosár funkció használatához be kell jelentkezned!"
        />
      </>
    );
  };

  export default CartLink;