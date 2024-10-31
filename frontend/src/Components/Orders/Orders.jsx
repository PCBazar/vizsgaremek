import React from 'react';

const OrderDetails = ({ order, onClose }) => {
  return (
    <div className="order-details">
      <h2>Rendelés Részletei</h2>
      <p><strong>Termék:</strong> {order.product.title}</p>
      <p><strong>vásárló:</strong> {order.buyer.username}</p>
      <p><strong>Ár:</strong> {order.price} Ft</p>
      <p><strong>Dátum:</strong> {new Date(order.transaction_date).toLocaleString()}</p>
      <p><strong>Fizetési mód:</strong> {order.payment_method}</p>
      <p><strong>Készlet mennyiség:</strong> {order.stock_quantity}</p>
      <button onClick={onClose}>Bezárás</button>
    </div>
  );
};

export default OrderDetails;
