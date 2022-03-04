export const logout = [
  { path: "/movies", label: "Movies" },
  { path: "/customers", label: "Customers" },
  { path: "/rentals", label: "Rentals" },
  { path: "/login", label: "Login" },
  { path: "/register", label: "Register" },
];

export function login(username) {
  return [
    { path: "/movies", label: "Movies" },
    { path: "/customers", label: "Customers" },
    { path: "/rentals", label: "Rentals" },
    { path: "/profile", label: username },
    { path: "/logout", label: "Logout" },
  ];
}
