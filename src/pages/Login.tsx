
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "patient";
  
  // Check if user is already logged in and redirect to proper dashboard
  useRoleRedirect();

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
              
              {["patient", "nurse", "admin"].map((role) => (
                <TabsContent key={role} value={role}>
                  <LoginForm role={role} />
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
