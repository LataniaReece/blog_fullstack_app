import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import CustomToastContainer from "./components/CustomToastContainer.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import App from "./App.tsx";
import { store } from "./store.ts";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
      <CustomToastContainer />
    </Provider>
  </React.StrictMode>
);
