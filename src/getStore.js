import { createStore, applyMiddleware, compose } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reducer from "./combineReducers";
import { initSagas } from "./initSagas";

const logger = createLogger({
  reducer
});

const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware, thunk, logger];
  const composables = [applyMiddleware(...middleWares)];
  const enhancer = compose(...composables);
  const store = createStore(reducer, {}, enhancer);
  initSagas(sagaMiddleware);
  return store;
};

export default getStore();
