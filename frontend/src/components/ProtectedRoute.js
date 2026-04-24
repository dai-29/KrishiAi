// ProtectedRoute — Bootstrap spinner, no Tailwind
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border" style={{ color: "#1B5E20", width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard"} replace />;
  }

  return children;
};

export default ProtectedRoute;
