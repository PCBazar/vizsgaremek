import React, { useState } from 'react';
import "./search.css";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Hívja meg a keresési függvényt a propként kapott handleSearch-el
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
