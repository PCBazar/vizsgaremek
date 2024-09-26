import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import "./list.css";

const Lista = () => {
    const [pc, setPc] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/GetAll/')
            .then(response => response.json())
            .then(data => setPc(data.products))
    }, []);

    return (
            <div className="Container">
                <div className="row">
                    {pc.map(item => (
                        <div className="col-md-4" key={item.id}>
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default Lista;
