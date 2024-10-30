import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./change.css";

axios.defaults.headers.common['X-CSRFToken'] = document.cookie.match(/csrftoken=([^;]+)/)[1];

const Change = () => {
    const { id } = useParams(); // az URL-ből kapott id paraméter
    const navigate = useNavigate();

    // Állapotok a hirdetés adataihoz
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState(''); // Darabszám állapot
    const [image, setImage] = useState(null); // Kép állapot

    // Az adatok betöltése, amikor a komponens betöltődik
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/adverts/${id}/`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setStockQuantity(response.data.stock_quantity); // Darabszám beállítása
                setImage(response.data.image); // Kép beállítása, ha van
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProduct();
    }, [id]);

    // Hirdetés frissítése
    const handleUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock_quantity', stockQuantity);
        if (image) {
            formData.append('image', image); // Kép frissítése
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/adverts/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Mivel fájlokat küldünk, ezt is meg kell adni
                },
            });
            alert('Hirdetés sikeresen frissítve!');
            navigate('/MyAds'); // Visszairányítás a "Hirdetéseim" oldalra
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Hiba történt a hirdetés frissítésekor.');
        }
    };

    return (
        <div className="change">
            <div className='change-container'>
                <h2>Hirdetés módosítása</h2>
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Cím:</label>
                        <input
                            className='bevitel'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Leírás:</label>
                        <textarea
                            className='bevitel'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Ár (Ft):</label>
                        <input
                            className='bevitel'
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Darabszám:</label>
                        <input
                            className='bevitel'
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Kép:</label>
                        <input
                            className='bevitel'
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])} // Kép beállítása
                        />
                    </div>
                    <button type="submit" className="submit-button">Mentés</button>
                </form>
            </div>
        </div>
    );
};

export default Change;
