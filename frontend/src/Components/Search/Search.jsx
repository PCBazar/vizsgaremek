import React, { useState } from 'react';
import "./search.css";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); 
  };

  return (
    <div className="search-component">
      <input
        type="text"
        placeholder="Keresés a termékek között..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </div>
  );
};

export default Search;
