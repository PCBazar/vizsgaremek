import React, { useState } from 'react';
import "./add.css";
import { useNavigate } from 'react-router-dom';

const Add = ({ categories }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState(''); // Mennyiség állapot
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock_quantity', stockQuantity); // Mennyiség hozzáadása
        formData.append('image', image);
        formData.append('category', category); // Kategória hozzáadása

        const response = await fetch('http://127.0.0.1:8000/api/Add/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
            },
            body: formData,
        });

        const data = await response.json(); // JSON válasz beolvasása

        if (response.ok) {
            alert('Hirdetés sikeresen feladva!');
            navigate('/')
            // Ha a válaszban új CSRF token van, frissítsd a cookie-t
            if (data.csrfToken) {
                document.cookie = `csrftoken=${data.csrfToken}; path=/`; // CSRF token frissítése
            }
        } else {
            alert(`Be kell jelentkezned a hirdetésfeladáshoz!`);
            navigate('/login')
            // Ha a válaszban új CSRF token van, frissítsd a cookie-t
            if (data.csrfToken) {
                document.cookie = `csrftoken=${data.csrfToken}; path=/`; // CSRF token frissítése
            }
        }
    };

    return (
        <div className='add-container'>
            <h2>Hirdetés Feladása</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Cím:</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Cím"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoComplete="off"
                />
                <label htmlFor="description">Leírás:</label>
                <textarea
                    id="description"
                    placeholder="Leírás"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="4"
                    style={{ width: '100%' }}
                    autoComplete="off"
                />
                <label htmlFor="price">Ár:</label>
                <input
                    id="price"
                    type="number"
                    placeholder="Ár"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    autoComplete="off"
                />
                <label htmlFor="stock_quantity">Mennyiség:</label>
                <input
                    id="stock_quantity"
                    type="number"
                    placeholder="Mennyiség"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    required
                    autoComplete="off"
                />
                <label htmlFor="image">Kép:</label>
                <input
                    id="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <label htmlFor="category">Kategória:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Hirdetés feladása</button>
            </form>
        </div>
    );
};

export default Add;
