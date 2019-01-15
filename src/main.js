import React from "react";
import ReactDOM from "react-dom";
import TemporaryDrawer from './Navigation'

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    React.createElement(TemporaryDrawer),
    document.getElementById("header")
  );
});
