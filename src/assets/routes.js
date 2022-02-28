import Customers from "../components/Customers";
import Movies from "../components/Movies";
import Rentals from "../components/Rentals";
import NotFound from "../components/NotFound";
import MovieForm from "../components/MovieForm";
import LoginForm from "../components/LoginForm";

export const routes = [
  { path: "login", component: <LoginForm /> },
  { path: "movies/:id", component: <MovieForm /> },
  { path: "movies", component: <Movies /> },
  { path: "/", component: <Movies /> },
  { path: "customers", component: <Customers /> },
  { path: "rentals", component: <Rentals /> },
  { path: "*", component: <NotFound /> },
];
