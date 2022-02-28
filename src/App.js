import _ from "lodash";
import React from "react";
import { Routes, Route } from "react-router";
import { routes } from "./assets/routes";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default App;
