import { put, takeLatest, all, select } from "redux-saga/effects";
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
    const marker = e.get('target');
    const id = marker.properties.get('id');
    console.log(id);
}

function* addRoute(action) {
  const id = i++;
  const { map, polyLine } = yield select(({ mapReducer }) => mapReducer);
  const { payload: name } = action;
  const coords = map.getCenter();

  const place = { name, coords, id };

  const myPlacemark = new ymaps.Placemark(
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
  console.log(myPlacemark);
  myPlacemark.events.add("dragend", updateMarker);
  yield put(placesListActions.savePlace(place));
  map.geoObjects.add(myPlacemark);
  polyLine.geometry.setCoordinates([[55.75, 37.57], [54.75, 36.57]]);
}

export function* mapSaga() {
  yield all([
    takeLatest(placesListActions.ADD_PLACE, addRoute),
    takeLatest(mapActions.INIT_MAP, initMap)
  ]);
}
