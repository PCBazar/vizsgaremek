// MyAdvertisements.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteAdvert from './Delete'; // Importáld be a törlő komponenst
import './myAds.css'

const MyAds = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const isLoggedIn = localStorage.getItem('authTokens') !== null;

  useEffect(() => {
    if (isLoggedIn) {
      const fetchAdvertisements = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/adverts/'); // API végpont, ahol a felhasználó hirdetései találhatók
          setAdvertisements(response.data);
        } catch (error) {
          console.error('Error fetching advertisements:', error);
        }
      };

      fetchAdvertisements();
    }
  }, [isLoggedIn]);

  // Frissítési logika a hirdetések törlése után
  const handleDelete = (id) => {
    setAdvertisements((prevAds) => prevAds.filter(ad => ad.id !== id));
  };

  return (
    <div>
      <h2>Hirdetéseim</h2>
      {advertisements.length > 0 ? (
        <ul>
          {advertisements.map(ad => (
            <li key={ad.id}>
              <h3>{ad.title}</h3>
              <p>{ad.description}</p>
              <p>Ár: {ad.price} Ft</p>
              <Link to={`/Change/${ad.id}`}>Módosítás</Link>
              <DeleteAdvert id={ad.id} onDelete={() => handleDelete(ad.id)} /> {/* Törlés gomb integrálása */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nincsenek hirdetéseid.</p>
      )}
    </div>
  );
};

export default MyAds;
