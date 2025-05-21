import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
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
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      // The redirect will be handled in AuthContext on auth state change
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fillDemoCredentials = () => {
    if (role === "patient") {
      setEmail("patient@example.com");
      setPassword("password");
    } else if (role === "nurse") {
      setEmail("nurse@example.com");
      setPassword("password");
    } else if (role === "admin") {
      setEmail("admin@example.com");
      setPassword("password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="email@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          type="submit" 
          className="w-full bg-imo-primary hover:bg-imo-secondary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Masuk...
            </>
          ) : (
            "Masuk"
          )}
        </Button>
        <div className="flex justify-between items-center">
          <Link to="/forgot-password" className="text-xs text-gray-600 hover:underline">
            Lupa password?
          </Link>
          <DemoCredentialsButton role={role} onFill={fillDemoCredentials} />
        </div>
        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-imo-primary hover:underline">
            Daftar
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
