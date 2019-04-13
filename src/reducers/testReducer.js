import createReducer from '../utils/createReducer';
import * as types from '../actions/testAction'

export const testReducer = createReducer({}, {
    [types.TEST_ACTION](state) { return state }
});
