import actionCreator from "../utils/makeActionCreator";

export const ADD_PLACE = "app/ADD_PLACE";
export const addPlace = actionCreator(ADD_PLACE, "payload");

export const DELETE_PLACE = "app/DELETE_PLACE";
export const deletePlace = actionCreator(DELETE_PLACE, "payload");

export const SAVE_PLACE = "app/SAVE_PLACE";
export const savePlace = actionCreator(SAVE_PLACE, "payload");
