import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as mapActions from "../../actions/mapActions";
import * as placesListActions from "../../actions/placesListActions";

import PlacesList from "../PlacesList";

import ymaps from "../../utils/yMap";
import "./App.css";

export const App = ({
  initMap,
  addPlace,
  placesList,
  deletePlace,
  reorderPlaces,
  loading
}) => {
  useEffect(() => {
    window.addEventListener("load", handleLoad);
  }, []);

  const handleLoad = () => {
    ymaps.ready(() => {
      initMap();
    });
  };

  return (
    <>
      <CssBaseline />
      {loading && (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h4" color="inherit">
              Тестовое задание для FunBox.
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="container">
          <PlacesList
            places={placesList}
            addPlace={addPlace}
            deletePlace={deletePlace}
            reorderPlaces={reorderPlaces}
          />
          <Paper id="map" />
        </div>
      </div>
    </>
  );
};

App.propTypes = {
  initMap: PropTypes.func.isRequired,
  addPlace: PropTypes.func.isRequired,
  placesList: PropTypes.instanceOf(Array).isRequired,
  reorderPlaces: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({
  placesListReducer: { placesList },
  mapReducer: { loading }
}) => ({
  placesList,
  loading
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
