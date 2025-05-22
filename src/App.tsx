
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/patient/PatientDashboard";
import NurseDashboard from "./pages/nurse/NurseDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            {/* Make Register accessible only to admins */}
            <Route path="/register" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Register />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected routes by role */}
            <Route path="/patient-dashboard" element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/nurse-dashboard" element={
              <ProtectedRoute allowedRoles={["nurse"]}>
                <NurseDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
