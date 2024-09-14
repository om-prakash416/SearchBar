// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Fuse from "fuse.js"; // Fuzzy search library
import "./SearchBar.css"; // For styling
import countries from "./countries.json"; // Import the JSON data

const SearchBar = () => {
  const [query, setQuery] = useState(""); // State to hold search query
  const [filteredCountries, setFilteredCountries] = useState([]); // State for search results

  // Configure Fuse.js for fuzzy search on country and capital fields
  const fuse = new Fuse(countries, {
    keys: ["country", "capital"], // Fields to search
    threshold: 0.3, // Set threshold to control search accuracy
  });

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length > 0) {
      const results = fuse.search(value);
      console.log("Search Results: ", results); // Add this to debug
      setFilteredCountries(results.map((result) => result.item));
    } else {
      setFilteredCountries([]);
    }
  };

  // Clear search suggestions when the input loses focus
  const handleBlur = () => {
    setTimeout(() => setFilteredCountries([]), 100); // Delay to allow clicking on suggestion
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by country or capital..."
        className="search-bar"
        onBlur={handleBlur} // Clear suggestions on blur
      />
      {filteredCountries.length > 0 && (
        <div className="autocomplete-suggestions">
          {filteredCountries.map((country, index) => (
            <div key={index} className="suggestion-item">
              <strong>{country.country}</strong> - {country.capital}
              <br />
              Population: {country.population.toLocaleString()}
              <br />
              Official Language: {country.official_language}
              <br />
              Currency: {country.currency}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
