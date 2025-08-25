import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import NavBar from "./components/NavBar.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer autoClose={2000} />
  </BrowserRouter>
);
