import Modal from "react-modal";
import React, { useState } from "react";

const DeleteAdvert = ({ id, onDelete }) => {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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

    const handleDelete = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/advertisements/${id}/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                },
            });

            if (response.ok) {
                onDelete(); 
                window.location.href="/" 
            }
        
    };

    const openConfirmModal = () => { //megnyitja a modal ablakot
        setConfirmModalOpen(true);
      };
    
      const closeConfirmModal = () => {   // nem töröl visszalép
        setConfirmModalOpen(false);
      };
     
      const confirmDelete = () => {   // töröl
        closeConfirmModal();
        handleDelete();
      };
    

    return (
        <>
        <button onClick={openConfirmModal} className="delete-button">
          Törlés
        </button>
        {/* Megerősítéshez használt modal */}
        {confirmModalOpen && (
          <ConfirmModal
            isOpen={confirmModalOpen}
            onConfirm={confirmDelete}
            onCancel={closeConfirmModal}
          />
        )}
      </>
    );
};

export default DeleteAdvert;