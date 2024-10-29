import React from 'react';
import  './filter.css'

const Filter = ({ categories, setSelectedCategory }) => {
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className='filter-sidebar'>
            <div className="filter-buttons">
                <button className='filter-button' onClick={() => setSelectedCategory('')}>Minden</button>
                {categories.map((category) => (
                    <button className='filter-button' key={category.id} onClick={() => handleCategoryClick(category.id)}>
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filter;
