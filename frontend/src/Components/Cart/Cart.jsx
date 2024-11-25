import React, { useEffect, useState } from 'react';
import "./cart.css";
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const username = localStorage.getItem('username') || "";
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${username}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    updateLocalStorage(cart);
  }, [cart]);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const stockQuantity = item.stock_quantity;
        const validQuantity = Math.min(newQuantity, stockQuantity);
        return { ...item, quantity: validQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('A kosár üres!');

    const item = cart[0];

    const transactionData = {
      product_id: item.id,
      quantity: item.quantity || 1,
      payment_method: paymentMethod,
    };

    const response = await fetch('http://127.0.0.1:8000/api/cart/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Sikeres tranzakció:', data);
      setCart([]);
      updateLocalStorage([]);
      alert('Tranzakció sikeresen létrejött!');
      navigate('/');
    } else {
      alert(`Hiba történt: ${data.error || 'Ismeretlen hiba'}`);
      console.error('Hiba történt:', data);
    }
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce((total, item) => {
      const itemTotal = (item.price * (item.quantity || 1));
      return total + itemTotal;
    }, 0);
    return total;
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <h2>Kosár tartalma</h2>
        {cart.length === 0 ? (
          <p>A kosaram üres.</p>
        ) : (
          <div>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  <h4>{item.title}</h4>
                  <p>{item.price} Ft</p>
                  <input
                    type="number"
                    value={item.quantity || 1}
                    min="1"
                    max={item.stock_quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <div className="torles">
                  <button onClick={() => removeItemFromCart(item.id)}>Törlés</button>
                  </div>
                </li>
              ))}
            </ul>
            <h3>Összesen: {calculateTotalPrice()} Ft</h3>
            <h3>Fizetési mód</h3>
            <select value={paymentMethod} onChange={handlePaymentMethodChange}>
              <option value="">Válassz fizetési módot</option>
              <option value="bank_card">Bankkártya</option>
              <option value="cash">Készpénz</option>
              <option value="paypal">PayPal</option>
            </select>
            <div className="fizetes">
            <button onClick={handleCheckout} disabled={cart.length === 0 || !paymentMethod}>
              Fizetés
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
