import React  from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./modal.css";

Modal.setAppElement("#root");

const LoginModal = ({ isOpen, onClose, message }) => {
    const navigate = useNavigate();
  
    const handleLoginClick = () => {
      onClose(); 
      navigate("/login"); 
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

  export default LoginModal