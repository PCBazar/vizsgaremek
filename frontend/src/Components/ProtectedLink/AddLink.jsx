import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";

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
        <LoginModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          message="A hirdetésfeladáshoz be kell jelentkezned!"
        />
      </>
    );
  };

export default AddLink;