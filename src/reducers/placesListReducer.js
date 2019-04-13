import createReducer from "../utils/createReducer";
import * as types from "../actions/placesListActions";

const initialState = {
  placesList: []
};

export const placesListReducer = createReducer(initialState, {
  [types.SAVE_PLACE](state, { payload }) {
    return { ...state, placesList: state.placesList.concat(payload) };
  }
});
