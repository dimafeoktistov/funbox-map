import actionCreator from "../utils/makeActionCreator";

export const ADD_PLACE = "app/ADD_PLACE";
export const addPlace = actionCreator(ADD_PLACE, "payload");

export const DELETE_PLACE = "app/DELETE_PLACE";
export const deletePlace = actionCreator(DELETE_PLACE, "payload");

export const SAVE_PLACE = "app/SAVE_PLACE";
export const savePlace = actionCreator(SAVE_PLACE, "payload");

export const UPDATE_PLACE = "app/UPDATE_PLACE";
export const updatePlace = actionCreator(UPDATE_PLACE, "payload");

export const REORDER_PLACES = "app/REORDER_PLACES";
export const reorderPlaces = actionCreator(REORDER_PLACES, "payload");
