import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './orderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/user/transactions/', {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error('Hiba a rendelési adatok lekérésekor:', error));
    }, []);

    const handleDetailsClick = (order) => {
        navigate(`/order-details`, { state: { order } });
    };

    return (
      <div className="order-list">
          <h2>Rendeléseim</h2>
          {orders.length === 0 ? ( 
              <p>Nincsenek rendeléseid. Kérlek, nézz vissza később!</p>
          ) : (
              <ul>
                  {orders.map((order) => (
                      <li key={order.id}>
                          <p>Termék: {order.product.title}</p>
                          <p>Ár: {order.price} Ft</p>
                          <p>{new Date(order.transaction_date).toLocaleString()}</p>
                          <div className="order-button">
                          <button onClick={() => handleDetailsClick(order)}>Részletek</button>
                          </div>
                      </li>
                  ))}
              </ul>
          )}
      </div>
  );
};

export default OrderList;
