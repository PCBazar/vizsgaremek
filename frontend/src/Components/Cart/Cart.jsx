import React, { useState } from 'react';
import { useCart } from './CartContext';
import "./cart.css"; 
import CustomModal from '../Modal/Modal';


const Cart = () => {
  const { cart, removeItemFromCart, updateQuantity, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('A kosár üres!');

    const transactionData = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity || 1,
      payment_method: paymentMethod,
    }));

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cart/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: transactionData }), // A `transactionData` helyett használjuk a JSON-t
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(`Hiba történt: ${data.error || 'Ismeretlen hiba'}`);
        setModalOpen(true)
        console.error('Hiba történt:', data);
      } else {
        clearCart();
        setMessage('Tranzakció sikeresen létrejött!');
        setModalOpen(true)
      }
    } catch (error) {
      console.error('Hiba történt a kijelentkezés közben:', error);
      alert(`Hiba történt: ${error.message}`);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.href = "/";
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
      {modalOpen && (
          <CustomModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            message={message}
          />
        )}
    </div>
  );
};
export default Cart;