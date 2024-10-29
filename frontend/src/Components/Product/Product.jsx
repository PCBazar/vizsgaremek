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
        <h1>{item.title}</h1>
        <img src={item.image} alt={item.title} />
        <div className="cart">
            <p>{item.price} Ft</p>
            <p>Eladó: {item.seller.username}</p>
            <button onClick={handleAddToCart}>Kosárba</button>
        </div>
        <p>Készleten: {item.stock_quantity}</p>
        <p>Felvétel dátuma: {new Date(item.created_at).toLocaleDateString()}</p>
        <p>{item.description}</p>
    </div>
);
};

export default Product;
