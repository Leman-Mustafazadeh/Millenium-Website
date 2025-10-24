// App.js
import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { Routes } from "./routes/ROUTES";
import { store } from "./services/store";

function App() {
  const routesa = createBrowserRouter(Routes);
  return (
    <Provider store={store}>
      <RouterProvider router={routesa} />
    </Provider>
  );
}
export default App;


