import { createSelector } from "reselect";

export const loadingSelector = createSelector(
  state => state.mapReducer.loading,
  loading => loading
);
export const snackBarSelector = createSelector(
  state => state.mapReducer.snackBar,
  snackBar => snackBar
);
export const mapSelector = createSelector(
  state => state.mapReducer.map,
  map => map
);
export const polyLineSelector = createSelector(
  state => state.mapReducer.polyLine,
  polyLine => polyLine
);
