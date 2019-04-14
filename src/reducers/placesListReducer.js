import createReducer from "../utils/createReducer";
import * as types from "../actions/placesListActions";

const initialState = {
  placesList: []
};

export const placesListReducer = createReducer(initialState, {
  [types.SAVE_PLACE](state, { payload }) {
    return { ...state, placesList: state.placesList.concat(payload) };
  },

  [types.DELETE_PLACE](state, { payload }) {
    return { ...state, placesList: state.placesList.filter(p => p.id !== payload.id)}
  },
  
  [types.UPDATE_PLACE](state, { payload: { id, coords } }) {
    return { ...state, placesList: state.placesList.map(place => {
      if (place.id === id) {
        return { ...place, coords }
      }
      return place;
    })}
  },

  [types.REORDER_PLACES](state, { payload: placesList }) {
    return { ...state, placesList }
  }
});
