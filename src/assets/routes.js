import Customers from "../components/Customers";
import Movies from "../components/Movies";
import Rentals from "../components/Rentals";
import NotFound from "../components/NotFound";
import MovieForm from "../components/MovieForm";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Logout from "../components/Logout";

export const routes = [
  { path: "logout", component: <Logout /> },
  { path: "register", component: <RegisterForm /> },
  { path: "login", component: <LoginForm /> },
  { path: "movies/new", component: <MovieForm /> },
  { path: "movies/:id", component: <MovieForm /> },
  { path: "movies", component: <Movies /> },
  { path: "/", component: <Movies /> },
  { path: "customers", component: <Customers /> },
  { path: "rentals", component: <Rentals /> },
  { path: "*", component: <NotFound /> },
];
