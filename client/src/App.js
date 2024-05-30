import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import ProductPage from "./Pages/ProductPage";

function App() {
  const { isLoggedIn, profile, logOut, isAdmin } = useAuth();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <HomePage />}
          />
          <Route path="/allProduct" element={<ProductPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
