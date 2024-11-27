import React  from "react";
import Modal from "react-modal";
import "./modal.css";

Modal.setAppElement("#root");

const CustomModal = ({ isOpen, onClose, message }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Figyelmeztetés"
        className="modal"
        overlayClassName="overlay"
      >
        <p>{message}</p>
        <button onClick={onClose}>Bezárás</button>
      </Modal>
    );
  };

  export default CustomModal;