import React, { useState } from "react";
import ConfirmModal from "../Modal/DeleteModal";

const DeleteAdvert = ({ id, onDelete }) => {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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