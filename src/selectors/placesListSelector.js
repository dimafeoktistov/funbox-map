import { createSelector } from "reselect";

export const placesListSelector = createSelector(
  state => state.placesListReducer.placesList,
  placesList => placesList
);
export const coordsSelector = createSelector(
  placesListSelector,
  placesList => placesList.map(place => place.coords)
);
