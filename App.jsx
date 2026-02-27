import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import UserPanelPage from "./pages/UserPanelPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import StockDetailsPage from "./pages/StockDetailsPage";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPanelPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPanelPage />
            </ProtectedRoute>
          }
        />

        <Route path="/stock/:symbol" element={<StockDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;