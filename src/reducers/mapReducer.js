import createReducer from '../utils/createReducer';
import * as types from '../actions/mapActions';

const initialState = {
    map: null,
    polyLine: null,
}

export const mapReducer = createReducer(initialState, {
    [types.CREATE_MAP](state, { payload: { map, polyLine } }) { return { ...state, map, polyLine } },
});
