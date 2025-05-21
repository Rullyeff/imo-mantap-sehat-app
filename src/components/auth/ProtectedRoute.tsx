import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import type { UserRole } from "@/types/auth.types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { user, loading, userRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // For debug purposes only
    if (user && userRole) {
      console.log(`User ${user.email} with role ${userRole} accessing ${location.pathname}`);
    }
  }, [user, userRole, location]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-imo-primary" />
        <span className="ml-2">Memverifikasi akses...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles are required, allow access to any authenticated user
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Check if user has the required role
  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  } else {
    // Redirect to appropriate dashboard based on role
    if (userRole === "patient") {
      return <Navigate to="/patient-dashboard" replace />;
    } else if (userRole === "nurse") {
      return <Navigate to="/nurse-dashboard" replace />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      // If role is unknown, redirect to login
      return <Navigate to="/login" replace />;
    }
  }
};

export default ProtectedRoute;
