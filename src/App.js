import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
// import { routes } from "./assets/routes";
import Navbar from "./components/Navbar";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import LoginForm from "./components/LoginForm";
import MovieForm from "./components/MovieForm";
import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";

const App = () => {
  const [user, setUser] = useState(null);
  let location = useLocation();
  // console.log(location);
  useEffect(() => {
    const userData = auth.getCurrentUser();
    setUser(userData);
  }, []);
  return (
    <>
      <ToastContainer />
      <Navbar user={user} />
      <div className="container mt-3">
        <Routes>
          <Route path="register" element={<RegisterForm />} />
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<Logout />} />
          <Route path="logout" element={<Logout />} />
          <Route path="movies" element={<Movies user={user} />} />
          <Route
            path="movies/:id"
            element={
              !user ? (
                <Navigate to="/login" replace state={{ from: location }} />
              ) : (
                <MovieForm user={user} />
              )
            }
          />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
