
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DemoCredentialsButton from "./DemoCredentialsButton";

interface LoginFormProps {
  role: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  const roleNames = {
    "patient": "Pasien",
    "nurse": "Perawat",
    "admin": "Admin"
  };
  
  const getDemoCredentials = (role: string) => {
    if (role === 'patient') {
      return { email: 'patient@demo.com', password: 'password123' };
    } else if (role === 'nurse') {
      return { email: 'nurse@demo.com', password: 'password123' };
    } else if (role === 'admin') {
      return { email: 'admin@demo.com', password: 'password123' };
    }
    return null;
  };
  
  const fillDemoCredentials = () => {
    const credentials = getDemoCredentials(role);
    if (credentials) {
      setEmail(credentials.email);
      setPassword(credentials.password);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Login Gagal",
        description: "Email dan password harus diisi",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use demo accounts for testing
      if (role === 'patient' && email === 'patient@demo.com' && password === 'password123') {
        signIn(email, password)
          .then(() => navigate('/patient-dashboard'))
          .catch((error) => {
            console.error('Login error:', error);
            toast({
              title: "Login Gagal",
              description: "Email atau password tidak valid",
              variant: "destructive",
            });
          })
          .finally(() => setIsLoading(false));
      } else if (role === 'nurse' && email === 'nurse@demo.com' && password === 'password123') {
        signIn(email, password)
          .then(() => navigate('/nurse-dashboard'))
          .catch((error) => {
            console.error('Login error:', error);
            toast({
              title: "Login Gagal",
              description: "Email atau password tidak valid",
              variant: "destructive",
            });
          })
          .finally(() => setIsLoading(false));
      } else if (role === 'admin' && email === 'admin@demo.com' && password === 'password123') {
        signIn(email, password)
          .then(() => navigate('/admin-dashboard'))
          .catch((error) => {
            console.error('Login error:', error);
            toast({
              title: "Login Gagal",
              description: "Email atau password tidak valid",
              variant: "destructive",
            });
          })
          .finally(() => setIsLoading(false));
      } else {
        // Real authentication
        signIn(email, password)
          .catch((error) => {
            console.error('Login error:', error);
            toast({
              title: "Login Gagal",
              description: "Email atau password tidak valid",
              variant: "destructive",
            });
          })
          .finally(() => setIsLoading(false));
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Gagal",
        description: "Email atau password tidak valid",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${role}-email`}>Email</Label>
          <Input 
            id={`${role}-email`}
            type="email" 
            placeholder="email@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${role}-password`}>Password</Label>
            <Link to="/forgot-password" className="text-xs text-imo-primary hover:underline">
              Lupa password?
            </Link>
          </div>
          <Input 
            id={`${role}-password`}
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="flex items-center justify-center">
          <DemoCredentialsButton role={role} onFill={fillDemoCredentials} />
        </div>
      </div>

      <div className="flex-col space-y-4 mt-4">
        <Button 
          type="submit" 
          className="w-full bg-imo-primary hover:bg-imo-secondary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : (
            <>Masuk sebagai {roleNames[role as keyof typeof roleNames]}</>
          )}
        </Button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Belum memiliki akun?{" "}
          <Link to="/register" className="text-imo-primary hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
