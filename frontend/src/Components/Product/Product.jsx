import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = ({ items }) => {
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
   
  return (
    <div className="product">
      <img src={item.image} alt={item.title} />
      <h4>{item.title}</h4>
      <p>{item.price}</p>
    </div>
  );
};

export default Product;
