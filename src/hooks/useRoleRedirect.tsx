import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function useRoleRedirect() {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user && userRole) {
      switch (userRole) {
        case "patient":
          navigate("/patient-dashboard");
          break;
        case "nurse":
          navigate("/nurse-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          // If role is unknown, stay on current page
          break;
      }
    }
  }, [user, userRole, loading, navigate]);

  return { user, userRole, loading };
}
