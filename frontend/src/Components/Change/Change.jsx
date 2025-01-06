import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./change.css";
import CustomModal from "../Modal/Modal";

axios.defaults.headers.common['X-CSRFToken'] = document.cookie.match(/csrftoken=([^;]+)/)[1];

const Change = () => {
    const { id } = useParams(); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState(''); 
    const [image, setImage] = useState(null); 
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState('');
   
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/advertisements/${id}/`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setStockQuantity(response.data.stock_quantity);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProduct();
    }, [id]);

   
    const handleUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock_quantity', stockQuantity);
        if (image) {
            formData.append('image', image); 
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/advertisements/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setModalOpen(true); 
            setMessage('Sikeres mentés!')
        } catch (error) {
            console.error('Error updating product:', error);
            setModalOpen(true);
            setMessage('Sikertelen mentés!')
        }
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        window.location.href = "/MyAds"; 
      };

    return (
        <div className="change">
            <div className='change-container'>
                <h2 className='change-h2'>Hirdetés módosítása</h2>
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label className='change-label'>Cím:</label>
                        <input
                            className='change-input'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='change-label'>Leírás:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='change-label'>Ár (Ft):</label>
                        <input
                            className='change-input'
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='change-label'>Darabszám:</label>
                        <input
                            className='change-input'
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='change-label'>Kép:</label>
                        <input
                            className='change-input'
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])} 
                        />
                    </div>
                    <div className="mentes">
                    <button type="submit" className="submit-button">Mentés</button>
                    </div>
                </form>
                {modalOpen && (
          <CustomModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            message={message}
          />
        )}
            </div>
        </div>
    );
};

export default Change;
