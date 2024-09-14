
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Fuse from "fuse.js";
import "./SearchBar.css";
import countries from "./countries.json";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by country, capital, or currency..."
        className="search-bar"
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
        <Box className="country-details-card" sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent className="card-2">
              <Typography
                className="country-1"
                sx={{ fontSize: 30 }}
                gutterBottom
              >
                <h5>{selectedCountry.country}</h5>
              </Typography>
              <Typography variant="p" component="div">
                <strong>Capital:</strong> {selectedCountry.capital}
              </Typography>
              <Typography color="" variant="p">
                <strong>Population:</strong>{" "}
                {selectedCountry.population.toLocaleString()} <br />
              </Typography>
              <Typography variant="p">
                <strong>Official Language:</strong>{" "}
                {selectedCountry.official_language}
              </Typography>
              <Typography>
                <strong>Currency:</strong> {selectedCountry.currency}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default SearchBar;
