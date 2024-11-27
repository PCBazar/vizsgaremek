import React from 'react';
import './filter.css';

const Filter = ({ categories, setSelectedCategory }) => {
    return (
        <div className="filter-container">
        <div className="filter-sidebar">
            <div className="filter-items">
                <div className="filter-item" onClick={() => setSelectedCategory('')}>Minden</div>
                {categories.map((category) => (
                    <div
                        className="filter-item"
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Filter;
