import { put, takeLatest, all, select, fork } from "redux-saga/effects";

import store from "../getStore";

import * as mapSelectors from '../selectors/mapSelector';
import * as mapActions from "../actions/mapActions";
import * as placesListSelectors from '../selectors/placesListSelector';
import * as placesListActions from "../actions/placesListActions";
import ymaps from "../utils/yMap";

const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

function* initMap() {
  const map = new ymaps.Map("map", {
    center: [55.75, 37.57],
    zoom: 9
  });

  const polyLine = new ymaps.Polyline(
    [],
    {},
    {
      strokeWidth: 2,
      strokeColor: "#0000FF"
    }
  );

  map.geoObjects.add(polyLine);

  yield put(mapActions.createMap({ map, polyLine }));
  yield put(mapActions.setLoading());
}

function updateMarker(e) {
  const marker = e.get("target");
  const id = marker.properties.get("id");
  const coords = marker.geometry.getCoordinates();
  store.dispatch(placesListActions.updatePlace({ id, coords }));
  store.dispatch(mapActions.updatePolyline());
}

function* addPlacemark(action) {
  const id = generateId();
  const map = yield select(mapSelectors.mapSelector);
  const placesList = yield select(placesListSelectors.placesListSelector);
  console.log(placesList);
  const { payload: name } = action;
  const coords = map.getCenter();

  const isNameUniq = placesList.find(place => place.name.toLowerCase() === name.toLowerCase());
  const isCoordsUniq = placesList.find(place => {
    return place.coords[0] === coords[0] && place.coords[1] === coords[1];
  });

  if (!!isCoordsUniq) {
    yield put(
      mapActions.setSnapbar({
        open: true,
        message: "Точка с такими координатами уже есть!"
      })
    );
  } else if (!!isNameUniq) {
    yield put(
      mapActions.setSnapbar({
        open: true,
        message: "Точка с таким названием уже есть!"
      })
    );
  } else {
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
    yield fork(updatePolyline);
  }
}

function* removePlacemark(action) {
  const map = yield select(mapSelectors.mapSelector);
  const { payload: place } = action;
  yield map.geoObjects.remove(place.placemark);
  yield fork(updatePolyline);
}

function* updatePolyline() {
  const coordsArray = yield select(placesListSelectors.coordsSelector);

  const polyLine = yield select(mapSelectors.polyLineSelector);
  polyLine.geometry.setCoordinates(coordsArray);
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
