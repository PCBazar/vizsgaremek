import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderDetails from './Orders'; 

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  console.log('userId a localStorage-ból:', localStorage.getItem('userId'));
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId'); 
      if (!userId) {
        console.error('Nincs bejelentkezett felhasználó. Az ID null vagy nem létezik.');
        return;
      }

      try {
        const response = await axios.get(`/api/GetAll/?userId=${userId}`);
        setOrders(response.data.transaction); 
      } catch (error) {
        console.error('Hiba a rendelések betöltésekor:', error);
      }
    };

    fetchOrders(); 
  }, []); 

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h1>Rendelések</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div>
              <span>{order.product.title} - {order.price} Ft</span>
              <button onClick={() => handleOrderClick(order)}>Részletek</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={closeDetails} />
      )}
    </div>
  );
};

export default OrderList;
