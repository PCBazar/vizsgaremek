import React  from "react";
import Modal from "react-modal";
import "./modal.css";

Modal.setAppElement("#root");

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onCancel}
        contentLabel="Megerősítés"
        className="modal"
        overlayClassName="overlay"
      >
        <p>Biztosan törölni szeretnéd a hirdetést?</p>
        <div>
          <button onClick={onConfirm}>Igen</button>
          <button onClick={onCancel}>Mégse</button>
        </div>
      </Modal>
    );
  };
export default ConfirmModal;