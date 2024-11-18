import React, { useState, useEffect } from 'react';
import "./add.css";

function Add() {
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stockQuantity, setStockQuantity] = useState('')
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/GetAll/")
            .then(response => response.json())
            .then(data => {
                setCategories(data.category);
            })
    }, []);

    useEffect(() => {
        if (categories.length > 0 && !category) {
            setCategory(categories[0].id)
        }
    }, [categories]);

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock_quantity', stockQuantity)
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

        const data = await response.json();
        if (response.ok) {
            setMessage(data.message)
            window.location.href = "/"
        }
        else {
            setMessage(data.message)
  
        }
    };

    return (
        <div className="add">
            <div className="add-container">
                <h2>Hirdetés feladása</h2>
                <form onSubmit={handleSubmit}>
                    <div className="add-form">
                        <label htmlFor="title">Cím:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder='Cím'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className="add-form">
                        <label htmlFor="description">Leírás:</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder='Leírás'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            autoComplete='off'
                            rows="4"
                            required
                        />
                        <div className="add-form">
                            <label htmlFor="price">Ár:</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder='Ár'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div className="add-form">
                            <label htmlFor="stock_quantity">Mennyiség:</label>
                            <input
                                type="number"
                                name="stock_quantity"
                                id="stock_quantity"
                                placeholder='Mennyiség'
                                value={stockQuantity}
                                onChange={(e) => setStockQuantity(e.target.value)}
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div className="add-form">
                            <label htmlFor="title">Kép:</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="add-form">
                            <label htmlFor="category">Kategoria:</label>
                            <select
                                type="text"
                                name="category"
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
                        </div>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}

export default Add;