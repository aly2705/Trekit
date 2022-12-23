import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AccPage from "./pages/AccPage";

function App() {
  return (
    <Routes>
      {/* <Route path="/*" element={<Navigate to="/auth?form=login" />} /> */}
      <Route path="/*" element={<Navigate to="/map" />} />
      <Route path="/map" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/account" element={<AccPage />} />
    </Routes>
  );
}

export default App;
