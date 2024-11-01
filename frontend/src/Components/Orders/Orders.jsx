import React from 'react';
import { useLocation } from 'react-router-dom';
import './orders.css';

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;  
  console.log("Order from state:", location.state);

  if (!order) {
    return <p>Nincs elérhető rendelési adat.</p>;
  }

  return (
        <div className="order-details">
            <div className="order-info">
                <h2>Rendelés részletei</h2>
                <p><strong>Termék:</strong> {order.product.title}</p>
                <p><strong>Vásárló:</strong> {order.buyer.username}</p>
                <p><strong>Ár:</strong> {order.price} Ft</p>
                <p><strong>Mennyiség:</strong> {order.stock_quantity}</p>
                <p><strong>Fizetési mód:</strong> {order.payment_method}</p>
                <p><strong>Dátum:</strong> {new Date(order.transaction_date).toLocaleString()}</p>
            </div>
        </div>
  );
};

export default OrderDetails;
