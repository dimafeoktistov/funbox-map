import { createSelector } from "reselect";

export const placesListSelector = createSelector(
  state => state.placesListReducer.placesList,
  placesList => placesList
);
export const coordsSelector = createSelector(
  state => state.placesListReducer.placesList,
  placesList => placesList.map(place => place.coords)
);
