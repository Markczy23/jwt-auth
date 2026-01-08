import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import RequestsReceivedPage from "./pages/RequestsReceivedPage";
import Login2 from "./pages/Login2";

export default function App() {
  const loggedIn = Boolean(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login2 />} />
        {loggedIn ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/received" element={<RequestsReceivedPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
