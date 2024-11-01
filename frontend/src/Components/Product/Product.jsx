import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./product.css"

const Product = ({ addToCart }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/GetAll/`);
        const data = await response.json();
        
        
        const foundItem = data.products.find(item => item.id === parseInt(id));
        setItem(foundItem);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [id]); 

  if (loading) return <div>Loading...</div>; 

  if (!item) return <div>Item not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      stock_quantity: item.stock_quantity,
    });
  };
   
  return (
    <div className="product">
      <h1 className="product-title">{item.title}</h1>
      <img src={item.image} alt={item.title} className="product-image" />
      <div className="product-info">
        <p className="date">Felvétel dátuma: {new Date(item.created_at).toLocaleDateString()}</p>
        <p className="product-seller">Eladó: {item.seller.username}</p>
        <p className="stock-info">Készleten: {item.stock_quantity}</p>
        <p className="product-price">{item.price} Ft</p>
        <button onClick={handleAddToCart} className="add-to-cart-button">Kosárba</button>
      </div>
      <p className="description">{item.description}</p>
    </div>
  );
};

export default Product;
