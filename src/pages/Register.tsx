
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"patient" | "nurse">("patient");
  
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (role: string) => (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Pendaftaran Gagal",
        description: "Anda harus menyetujui syarat dan ketentuan",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Pendaftaran Gagal",
        description: "Password dan konfirmasi password tidak cocok",
        variant: "destructive",
      });
      return;
    }
    
    if (!name || !email || !password || !phone) {
      toast({
        title: "Pendaftaran Gagal",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Extract first and last name
    const nameParts = name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    
    signUp(
      email, 
      password, 
      firstName,
      lastName,
      phone,
      role as UserRole
    )
    .then(() => {
      // Registration success toast is shown in the signUp function
      navigate("/login");
    })
    .catch(error => {
      console.error('Registration error:', error);
      toast({
        title: "Pendaftaran Gagal",
        description: "Terjadi kesalahan saat pendaftaran. Silakan coba lagi.",
        variant: "destructive",
      });
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const roleNames = {
    "patient": "Pasien",
    "nurse": "Perawat",
  };

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <div className="max-w-lg mx-auto">
          <Card className="border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Daftar Akun IMO MANTAP</CardTitle>
              <CardDescription className="text-center">
                Buat akun untuk mulai menggunakan IMO MANTAP
              </CardDescription>
            </CardHeader>
            
            <Tabs 
              defaultValue="patient" 
              className="px-6"
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as "patient" | "nurse")}
            >
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="patient">Pasien</TabsTrigger>
                <TabsTrigger value="nurse">Perawat</TabsTrigger>
              </TabsList>
              
              {Object.keys(roleNames).map((role) => (
                <TabsContent key={role} value={role}>
                  <form onSubmit={handleRegister(role)}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${role}-name`}>Nama Lengkap</Label>
                        <Input 
                          id={`${role}-name`}
                          placeholder="Nama lengkap" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
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
                        <Label htmlFor={`${role}-phone`}>Nomor Telepon</Label>
                        <Input 
                          id={`${role}-phone`}
                          placeholder="0812-3456-7890" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${role}-password`}>Password</Label>
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
                      <div className="space-y-2">
                        <Label htmlFor={`${role}-confirm-password`}>Konfirmasi Password</Label>
                        <Input 
                          id={`${role}-confirm-password`}
                          type="password" 
                          placeholder="••••••••" 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox 
                          id={`${role}-terms`} 
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                          disabled={isLoading}
                        />
                        <Label htmlFor={`${role}-terms`} className="text-sm leading-none">
                          Saya menyetujui {" "}
                          <Link to="/terms" className="text-imo-primary hover:underline">
                            syarat dan ketentuan
                          </Link>
                          {" "} yang berlaku
                        </Label>
                      </div>
                    </CardContent>

                    <CardFooter className="flex-col space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-imo-primary hover:bg-imo-secondary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mendaftarkan...
                          </>
                        ) : (
                          <>Daftar sebagai {roleNames[role as keyof typeof roleNames]}</>
                        )}
                      </Button>
                      <p className="text-center text-sm text-gray-600">
                        Sudah memiliki akun?{" "}
                        <Link to="/login" className="text-imo-primary hover:underline">
                          Masuk
                        </Link>
                      </p>
                      {role === "patient" && (
                        <p className="text-xs text-gray-500 text-center">
                          Daftar sebagai pasien untuk menerima pengingat minum obat dan terhubung dengan perawat Anda.
                        </p>
                      )}
                      {role === "nurse" && (
                        <p className="text-xs text-gray-500 text-center">
                          Daftar sebagai perawat untuk mengelola dan memantau kepatuhan minum obat pasien Anda.
                        </p>
                      )}
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

export default Register;
