import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as mapActions from "../../actions/mapActions";
import * as placesListActions from "../../actions/placesListActions";

import PlacesList from "../PlacesList";

import ymaps from "../../utils/yMap";
import "./App.css";

const App = ({ initMap, addPlace, placesList, deletePlace, reorderPlaces }) => {
  useEffect(() => {
    window.addEventListener("load", handleLoad);
  }, []);

  const handleLoad = () => {
    ymaps.ready(() => {
      initMap();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div className="container">
        <PlacesList
          places={placesList}
          addPlace={addPlace}
          deletePlace={deletePlace}
          reorderPlaces={reorderPlaces}
        />
        <div id="map" style={{ width: "600px", height: "400px" }} />
      </div>
    </div>
  );
};

App.propTypes = {
  initMap: PropTypes.func.isRequired,
  addPlace: PropTypes.func.isRequired,
  placesList: PropTypes.instanceOf(Array).isRequired,
  reorderPlaces: PropTypes.func.isRequired
};

const mapStateToProps = ({ placesListReducer: { placesList } }) => ({
  placesList
});

const mapDispatchToProps = dispatch => ({
  initMap() {
    dispatch(mapActions.initMap());
  },
  addPlace(place) {
    dispatch(placesListActions.addPlace(place));
  },
  deletePlace(place) {
    dispatch(placesListActions.deletePlace(place));
  },
  reorderPlaces(places) {
    dispatch(placesListActions.reorderPlaces(places));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
