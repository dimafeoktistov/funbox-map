import actionCreator from "../utils/makeActionCreator";

export const CREATE_MAP = "app/CREATE_MAP";
export const createMap = actionCreator(CREATE_MAP, "payload");

export const ADD_ROUTE = "app/ADD_ROUTE";
export const addRoute = actionCreator(ADD_ROUTE, "payload");

export const INIT_MAP = "app/INIT_MAP";
export const initMap = actionCreator(INIT_MAP);
