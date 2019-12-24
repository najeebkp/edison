import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./_reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewareList = [thunkMiddleware];

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewareList))
  );
};

export default configureStore;
