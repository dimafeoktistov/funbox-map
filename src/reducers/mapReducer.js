import createReducer from '../utils/createReducer';
import * as types from '../actions/mapActions';

const initialState = {
    map: null,
    polyLine: null,
    loading: true,
    snackBar: {
        open: false,
        message: null
    }
}

export const mapReducer = createReducer(initialState, {
    [types.CREATE_MAP](state, { payload: { map, polyLine } }) { return { ...state, map, polyLine } },

    [types.SET_LOADING](state) { return { ...state, loading: false }},

    [types.SET_SNAPBAR](state, { payload }) { return { ...state, snackBar: payload }}
});
