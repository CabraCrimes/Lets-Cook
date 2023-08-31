import React from "react";
import { createRoot } from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css" 
import Home from "../src/pages/Home";


const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

