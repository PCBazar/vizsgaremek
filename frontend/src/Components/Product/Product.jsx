import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./product.css"

const Product = ({ items, addToCart }) => {
  const { id } = useParams();
  const item = items.find(item => item.id === parseInt(id)); 

  const [hasReloaded, setHasReloaded] = useState(
    sessionStorage.getItem('hasReloaded') === 'true'
  );

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('hasReloaded');
    };
  }, []);

  useEffect(() => {
    if (!item && !hasReloaded) {
      setHasReloaded(true);
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }, [item, hasReloaded]);

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
