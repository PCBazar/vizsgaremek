import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAdvert = ({ id, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Biztosan törölni szeretnéd a hirdetést?');
        if (confirmDelete) {
            const response = await fetch(`http://127.0.0.1:8000/api/advertisements/${id}/`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                },
            });

            if (response.ok) {
                alert('Hirdetés sikeresen törölve!');
                onDelete(); // Frissítjük a hirdetések listáját a szülő komponensben
                navigate('/'); // Visszairányítás a főoldalra
            } else {
                alert('Hiba történt a hirdetés törlésekor.');
            }
        }
    };

    return (
        <button onClick={handleDelete} className="delete-button">
            Törlés
        </button>
    );
};

export default DeleteAdvert;
