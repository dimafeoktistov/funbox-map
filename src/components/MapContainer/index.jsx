import React from "react";
import PropTypes from "prop-types";
import { Map, Placemarker, Polyline } from "react-yandex-maps";

const MapContainer = ({ places }) => {
  const handleDragend = () => {};
  return (
    <Map
      state={{
        center: [55.75, 37.57],
        zoom: 9
      }}
      style={{ width: '600px', height: '400px' }}
    >
      {/* {places.map(place => (
          <Placemarker
            onDragend={handleDragend}
            key={place.id}
            geometry={place.coords}
            properties={{ ballonContent: place.name}}
          />
      ))} */}
      <Polyline geometry={[]} />
    </Map>
  );
};

MapContainer.propTypes = {
  places: PropTypes.instanceOf(Array).isRequired
};

export default MapContainer;
