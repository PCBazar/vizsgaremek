import React, { useState, useEffect } from "react";
import "./add.css";
import CustomModal from "../Modal/Modal";



function Add() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/GetAll/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.category);
      });
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].id);
    }
  }, [categories]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock_quantity", stockQuantity);
    if (image) {
      formData.append("image", image);
    }
    formData.append("category", category);

    const response = await fetch("http://127.0.0.1:8000/api/Add/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": document.cookie.match(/csrftoken=([^;]+)/)[1],
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      setModalOpen(true); 
    }else {
      setMessage('Hiba történt hirdetésfeladáskor!'); 
      setModalOpen(true);
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="add">
      <div className="add-container">
        <h2>Hirdetés feladása</h2>
        <form onSubmit={handleSubmit}>
          <div className="add-form">
            <label htmlFor="title">Cím:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Cím"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="add-form">
            <label htmlFor="description">Leírás:</label>
            <textarea
              name="description"
              id="description"
              placeholder="Leírás"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>
          <div className="add-form">
            <label htmlFor="price">Ár:</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Ár"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="add-form">
            <label htmlFor="stock_quantity">Mennyiség:</label>
            <input
              type="number"
              name="stock_quantity"
              id="stock_quantity"
              placeholder="Mennyiség"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              required
            />
          </div>
          <div className="add-form">
            <label htmlFor="image">Kép:</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="add-form">
            <label htmlFor="category">Kategória:</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container">
            <button type="submit">Hirdetés feladása</button>
          </div>
        </form>
        {message && <p>{message}</p>}
        
        {modalOpen && (
          <CustomModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            message={message}
          />
        )}
      </div>
    </div>
  );
}

export default Add;
