import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "../src/pages/Home";
import Register from "../src/pages/register";
import Login from "../src/pages/login";
import Favourites from "./pages/favourite";


const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="favourites" element={<Favourites/>}/>
    </Routes>
  </Router>
);
