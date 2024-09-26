import React from 'react';
import { useParams } from 'react-router-dom';

const Product = ({ items }) => {
  const { id } = useParams();
  const item = items.find(item => item.id === parseInt(id)); // ID alapján keresés

  if (!item) return <div>Item not found</div>; // Hibakezelés, ha az item nem található

  return (
    <div className="product">
      <img src={item.image} alt={item.title} />
      <h4>{item.title}</h4>
      <p>{item.price}</p>
    </div>
  );
};

export default Product;
