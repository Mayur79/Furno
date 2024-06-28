import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import ProductPage from "./Pages/ProductPage";
import ProductDetail from "./Pages/ProductDetail";
import CartPage from "./Pages/CartPage";
import BillingPage from "./Pages/BillingPage";
import OrderCompletedPage from "./Pages/OrderCompletedPage";

function App() {
  const { isLoggedIn, profile, logOut, isAdmin } = useAuth();
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <HomePage />}
          />
          <Route path="/allProduct" element={<ProductPage />} />
          <Route path="/productDetail/:productId" element={<ProductDetail />} />
          <Route path="/addToCart" element={<CartPage />} />
          <Route path="/billingPage" element={<BillingPage />} />
          <Route
            path="/orderCompleted/:orderId"
            element={<OrderCompletedPage />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
