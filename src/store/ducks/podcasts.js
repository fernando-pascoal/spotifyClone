import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/**
 * Action types & Creators
 */
const { Types, Creators } = createActions({
    loadRequest: null,
    loadSuccess: ["data"],
    loadFailure: null
});

export const PodcastsTypes = Types;
export default Creators;

/**
 * initial state
 */
export const INITIAL_STATE = Immutable({
    data: []
});

/**
 * Reducer
 */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_SUCCESS]: (state, action) => state.merge({ data: action.data }) //({ ...state, data: action.data })
});
