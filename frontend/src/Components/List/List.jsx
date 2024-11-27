import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import Search from '../Search/Search';
import './list.css';
import Filter from '../Filter/Filter';

const Lista = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/GetAll/')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setCategories(data.category);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredProducts = products.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? item.category.id === parseInt(selectedCategory) : true;
        return matchesSearch && matchesCategory;
    });



    return (
        <div className="Container">
            <Search onSearch={handleSearch} />
            <Filter categories={categories} setSelectedCategory={setSelectedCategory} />
            <div className="row">
                {filteredProducts.map(item => (
                    <div className="col-12 col-md-4 col-lg-6" key={item.id}>
                        <Card item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lista;
