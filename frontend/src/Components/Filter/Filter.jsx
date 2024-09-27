import React from 'react';

const Filter = ({ categories, setSelectedCategory }) => {
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId); // Beállítja a kiválasztott kategóriát
    };

    return (
        
        <div className="filter-buttons">
            <button onClick={() => setSelectedCategory('')}>Minden</button> {/* Minden gomb */}
            {categories.map((category) => (
                <button key={category.id} onClick={() => handleCategoryClick(category.id)}>
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default Filter;