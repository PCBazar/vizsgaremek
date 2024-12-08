import "./registration.css"
import React, { useState } from 'react';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName,
            }),
        });

        const data = await response.json();
        setMessage(data.message);
        if (response) {
            setMessage(data.message);
            window.location.href = "/login";
        }else{
            setMessage(data.message);
        }
    };

    return (
        <div className="registration">
            <div className='registration-container'>
                <h2>Regisztráció</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Felhasználónév:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="6"
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
                            required
                            minLength="6"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName">Vezetéknév:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Keresztnév:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="reg-button">
                    <button type="submit">Regisztráció</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Registration;

