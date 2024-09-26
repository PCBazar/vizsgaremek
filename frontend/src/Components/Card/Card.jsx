import React from 'react';
import "./card.css";
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    if (!item) return null;

    return (
        <Link to={`/product/${item.id}`}>
            <div className="card" style={{ width: "200px" }}>
                <img className="card-img-top" src={item.image} alt={item.title} title={item.title} style={{ width: "200px", height: "200px" }} />
                <div className="card-body">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-text">{item.price}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
