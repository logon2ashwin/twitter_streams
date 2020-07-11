import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import HomeComponent from "./src/components/HomeComponent/HomeComponent";

import "./app.scss";


ReactDOM.render(
  <Provider store={store}>
    <HomeComponent />
  </Provider>,
  document.getElementById("app")
);
