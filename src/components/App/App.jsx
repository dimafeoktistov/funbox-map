import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

import PlacesList from "../PlacesList";

import AsyncComponent from "./AsyncComponent";
import ymaps from "../../utils/yMap";
import "./App.css";

const TestComponent = AsyncComponent(() => import('./Test'));

export const App = ({
  initMap,
  addPlace,
  placesList,
  deletePlace,
  reorderPlaces,
  loading,
  snackBar,
  handleClose
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBar.open}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        onClose={() => handleClose({ open: false, message: '' })}
        autoHideDuration={3000}
        message={<span id="message-id">{snackBar.message}</span>}
      />
      <CssBaseline />
      {loading && (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
      <TestComponent />
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
