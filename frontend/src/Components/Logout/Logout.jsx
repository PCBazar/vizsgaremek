import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./logout.css";

const Logout = () => {
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {


            // Majd használjuk a megszerzett CSRF tokent a kijelentkezéshez
            const response = await fetch('http://127.0.0.1:8000/api/logout/', {
                method: 'POST', // POST kérés
                credentials: 'include', // A session cookie-k küldése
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1], // CSRF token beállítása
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Logout response:', data);
                alert(data.message);

                // Token eltávolítása
                localStorage.removeItem("authTokens");

                // Átirányítás a főoldalra
                navigate('/');
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Hiba: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Hiba történt a kijelentkezés közben:', error);
        }
    };

    return (
        <a href="#" onClick={handleLogout}>Kijelentkezés</a>
    );
};

export default Logout;
