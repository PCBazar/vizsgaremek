import React, { useState } from 'react';
import "./login.css";
import { Link } from 'react-router-dom';

const Login = () => {
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
        if (response.ok && data.status === 'success') {
            console.log(data);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username',JSON.stringify(data.username));
            localStorage.setItem('authTokens', JSON.stringify(data.token));
            setMessage(data.message);
            window.location.href = '/';
        }
        else {
            setMessage(data.message);
        }
    };

    return (
        <div className="login">
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
                    <div className="button-container">
                        <div className='login-button'><button type="submit">Bejelentkezés</button></div>
                        <Link to="/registration" className='login-link'>
                            <button type="button">Regisztráció</button>
                        </Link>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
