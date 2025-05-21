
import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "patient";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (role: string) => (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login functionality
    if (email && password) {
      toast({
        title: "Login Berhasil",
        description: `Berhasil masuk sebagai ${roleNames[role as keyof typeof roleNames]}`,
      });
    } else {
      toast({
        title: "Login Gagal",
        description: "Email dan password harus diisi",
        variant: "destructive",
      });
    }
  };

  const roleNames = {
    "patient": "Pasien",
    "nurse": "Perawat",
    "admin": "Admin"
  };

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Masuk ke IMO MANTAP</CardTitle>
              <CardDescription className="text-center">
                Masukkan detail login Anda untuk mengakses akun
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue={defaultRole} className="px-6">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="patient">Pasien</TabsTrigger>
                <TabsTrigger value="nurse">Perawat</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              
              {Object.keys(roleNames).map((role) => (
                <TabsContent key={role} value={role}>
                  <form onSubmit={handleLogin(role)}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${role}-email`}>Email</Label>
                        <Input 
                          id={`${role}-email`}
                          type="email" 
                          placeholder="email@example.com" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          required
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
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="flex-col space-y-4">
                      <Button type="submit" className="w-full bg-imo-primary hover:bg-imo-secondary">
                        Masuk sebagai {roleNames[role as keyof typeof roleNames]}
                      </Button>
                      <p className="text-center text-sm text-gray-600">
                        Belum memiliki akun?{" "}
                        <Link to="/register" className="text-imo-primary hover:underline">
                          Daftar
                        </Link>
                      </p>
                    </CardFooter>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
