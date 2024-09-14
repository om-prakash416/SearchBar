
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Fuse from "fuse.js"; 
import "./SearchBar.css"; 
import countries from "./countries.json"; 
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState(null); 

 
  const fuse = new Fuse(countries, {
    keys: ["country", "capital", "currency"], 
    threshold: 0.3, 
  });

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length > 0) {
      const results = fuse.search(value);
      setFilteredCountries(results.map((result) => result.item));
    } else {
      setFilteredCountries([]);
      setSelectedCountry(null); 
    }
  };

  const handleSuggestionClick = (country) => {
    setSelectedCountry(country);
    setFilteredCountries([]);
    setQuery(country.country); 
  };

  
  const handleBlur = () => {
    setTimeout(() => setFilteredCountries([]), 200); 
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by country, capital, or currency..."
        className="search-bar"
        onBlur={handleBlur} 
      />
      {filteredCountries.length > 0 && (
        <div className="autocomplete-suggestions">
          {filteredCountries.map((country, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(country)}
            >
              <strong>{country.country}</strong> - {country.capital}
              <br />
              Currency: {country.currency}
            </div>
          ))}
        </div>
      )}
      {selectedCountry && (
        <div className="country-details">
          <h2>{selectedCountry.country}</h2>
          <p>
            <strong>Capital:</strong> {selectedCountry.capital}
          </p>
          <p>
            <strong>Population:</strong>{" "}
            {selectedCountry.population.toLocaleString()}
          </p>
          <p>
            <strong>Official Language:</strong>{" "}
            {selectedCountry.official_language}
          </p>
          <p>
            <strong>Currency:</strong> {selectedCountry.currency}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
