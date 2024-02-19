import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import CustomToastContainer from "./components/CustomToastContainer.tsx";
import App from "./App.tsx";
import { store } from "./store.ts";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <CustomToastContainer />
    </Provider>
  </React.StrictMode>
);
