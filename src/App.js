import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AccPage from "./pages/AccPage";
import AuthContext from "./store/auth-context";

function App() {
  const isLoggedIn = useContext(AuthContext).isLoggedIn;
  console.log(isLoggedIn);

  return (
    <Routes>
      {!localStorage.getItem("token") && (
        <Route path="/*" element={<Navigate to="/auth?form=login" />} />
      )}
      {localStorage.getItem("token") && (
        <Route path="/*" element={<HomePage />} />
      )}

      {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
      {isLoggedIn && <Route path="/map" element={<HomePage />} />}

      {isLoggedIn && <Route path="/account" element={<AccPage />} />}
    </Routes>
  );
}

export default App;
