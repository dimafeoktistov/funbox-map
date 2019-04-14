import { put, takeLatest, all, select } from "redux-saga/effects";

import store from "../getStore";

import * as mapActions from "../actions/mapActions";
import * as placesListActions from "../actions/placesListActions";
import ymaps from "../utils/yMap";

let i = 0;

function* initMap() {
  const map = new ymaps.Map("map", {
    center: [55.75, 37.57],
    zoom: 9
  });

  const polyLine = new ymaps.Polyline(
    [],
    {},
    {
      strokeWidth: 6,
      strokeColor: "#0000FF"
    }
  );

  map.geoObjects.add(polyLine);

  yield put(mapActions.createMap({ map, polyLine }));
}

function updateMarker(e) {
  const marker = e.get("target");
  const id = marker.properties.get("id");
  const coords = marker.geometry.getCoordinates();
  store.dispatch(placesListActions.updatePlace({ id, coords }));
  store.dispatch(mapActions.updatePolyline());
}

function* addPlacemark(action) {
  const id = `place-${i++}`;
  const { map } = yield select(({ mapReducer }) => mapReducer);
  const { payload: name } = action;
  const coords = map.getCenter();

  const placemark = new ymaps.Placemark(
    coords,
    {
      // При клике на маркер, появится название точки.
      balloonContent: name,
      id
    },
    {
      draggable: true, // Маркер можно перемещать.
      preset: "islands#whiteStretchyIcon"
    }
  );

  placemark.events.add("dragend", updateMarker);

  const place = { name, coords, id, placemark };
  yield put(placesListActions.savePlace(place));
  map.geoObjects.add(placemark);
  yield put(mapActions.updatePolyline());
}

function* removePlacemark(action) {
  const { map } = yield select(({ mapReducer }) => mapReducer);
  const { payload: place } = action;
  yield map.geoObjects.remove(place.placemark);
  yield put(mapActions.updatePolyline());
}

function* updatePolyline() {
  const coordsArray = yield select(({ placesListReducer: { placesList } }) => {
    return placesList.map(place => place.coords);
  });

  const { polyLine } = yield select(state => ({
    polyLine: state.mapReducer.polyLine
  }));
  console.log(polyLine);
  polyLine.geometry.setCoordinates(coordsArray);
  console.log(coordsArray);
}

export function* mapSaga() {
  yield all([
    takeLatest(placesListActions.ADD_PLACE, addPlacemark),
    takeLatest(placesListActions.DELETE_PLACE, removePlacemark),
    takeLatest(placesListActions.REORDER_PLACES, updatePolyline),
    takeLatest(mapActions.INIT_MAP, initMap),
    takeLatest(mapActions.UPDATE_POLYLINE, updatePolyline)
  ]);
}
