import React, { useEffect } from "react";
import { connect } from 'react-redux';

import * as mapActions from '../../actions/mapActions';
import * as placesListActions from '../../actions/placesListActions';

import Search from '../Search';

import ymaps from '../../utils/yMap';
import "./App.css";

const App = ({ initMap, addPlace }) => {
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
      <Search addPlace={addPlace} />
      <div id="map" style={{ width: "600px", height: "400px" }} />
    </div>
  );
};

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    initMap() { dispatch(mapActions.initMap()) },
    addPlace(place) { dispatch(placesListActions.addPlace(place)) }
});

export default connect(null, mapDispatchToProps)(App);
