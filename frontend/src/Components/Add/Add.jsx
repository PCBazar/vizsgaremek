import React, { useState, useEffect } from 'react';
import "./add.css";
import { useNavigate } from 'react-router-dom';

const Add = ({ categories }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (categories.length > 0 && !category) {
            setCategory(categories[0].id);
        }
    }, [categories]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock_quantity', stockQuantity);
        if (image) {
            formData.append('image', image);
        }
        formData.append('category', category);


        const response = await fetch('http://127.0.0.1:8000/api/Add/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
            },
            body: formData,
        });

        if (response.ok) {
            alert('Hirdetés sikeresen feladva!');
            navigate('/');
        } else {
            alert('Be kell jelentkezned a hirdetés feladásához!.');
            navigate('/login');
        }

    };


    return (
        <div className="add">
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
        </div>
    );
};

export default Add;
