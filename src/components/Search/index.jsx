import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ addPlace, ...props }) => {
  const [place, setPlace] = useState("");
  const handlePlaceChange = event => setPlace(event.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    addPlace(place);
    setPlace('')
  }
  // addPlaceToMap(place);
  return (
    <form onSubmit={handleSubmit} {...props}>
      <input
        type="text"
        placeholder="Введите место"
        onChange={handlePlaceChange}
        value={place}
        required
      />
      <button type="submit">Добавить к маршруту</button>
    </form>
  );
};

Search.propTypes = {
  addPlace: PropTypes.func.isRequired
};

export default Search;
