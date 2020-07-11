import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

// Debug extension for chrome
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const middleWare = applyMiddleware(thunk);

const store = createStore(reducers, middleWare);

export default store;

