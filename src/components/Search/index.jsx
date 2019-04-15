import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./Search.css";

const Search = ({ addPlace, ...props }) => {
  const [place, setPlace] = useState("");
  const handlePlaceChange = event => setPlace(event.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    addPlace(place);
    setPlace("");
  };

  return (
    <form onSubmit={handleSubmit} {...props} className="form">
      <TextField
        id="place"
        label="Место маршрута"
        type="text"
        placeholder="Введите место"
        className="search"
        onChange={handlePlaceChange}
        value={place}
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className="button"
        style={{ marginLeft: '10px' }}
      >
        Добавить
      </Button>
    </form>
  );
};

Search.propTypes = {
  addPlace: PropTypes.func.isRequired
};

export default Search;
