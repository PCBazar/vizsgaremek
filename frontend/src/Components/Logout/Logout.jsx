import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {



            const response = await fetch('http://127.0.0.1:8000/api/logout/', {
                method: 'POST', 
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1], 
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Logout response:', data);
                alert(data.message);

                localStorage.removeItem("userId");
                localStorage.removeItem("authTokens");
                localStorage.removeItem('username');

                window.location.href="/"
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
