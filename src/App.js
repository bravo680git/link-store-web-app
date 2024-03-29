import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import * as Pages from "./pages";
import Loading from "./components/Loading";

function App() {
  const loading = useSelector((state) => state.data.loading);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Pages.LoginPage />} />
        <Route path="/register" element={<Pages.RegisterPage />} />
        <Route path="/store" element={<Pages.StorePage />} />
        <Route path="/admin" element={<Pages.AdminPage />} />
        <Route path="/" element={<Pages.HomePage />} />
      </Routes>
      <Loading show={loading} />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
