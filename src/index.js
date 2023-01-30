import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/login";
import Course from "./pages/course";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Learning from "./pages/learning";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user/:id/courses/active" element={<Course />} />
          <Route exact path="/course" element={<Learning />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
