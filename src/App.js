import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router";
import jwtDecode from "jwt-decode";
import { routes } from "./assets/routes";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const userData = jwtDecode(jwt);
      console.log(userData);
      setUser(userData);
    } catch (error) {}
  }, []);
  return (
    <>
      <ToastContainer />
      <Navbar user={user} />
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
