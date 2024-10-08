import React, { useState } from 'react';
import "./login.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [inputUsername, setInputUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: inputUsername, password }),
        });

        const data = await response.json();
        if (response.ok) {
                console.log(data); 
                localStorage.setItem('authTokens', JSON.stringify(data.token));
                setMessage(data.message || "Bejelentkezés sikeres");
                navigate('/');
                window.location.reload();
        } 
        else {
            setMessage(data.message || "Hiba történt a bejelentkezéskor");
        }
    };

    return (
        <div className='login-container'>
            <h2>Bejelentkezés</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Felhasználónév:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={inputUsername}
                        onChange={(e) => setInputUsername(e.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Jelszó:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>
                <button type="submit">Bejelentkezés</button>
                <p>
                    <Link to="/registration"><button type="button">Regisztráció</button></Link>
                </p>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
