
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth.types";

const AddUserForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>("patient");
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !role) {
      toast({
        title: "Validasi gagal",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await signUp(email, password, firstName, lastName, phone, role);
      
      // Reset form after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("patient");
      
      toast({
        title: "Pengguna berhasil ditambahkan",
        description: `${firstName} ${lastName} (${role}) telah berhasil didaftarkan`,
      });
    } catch (error) {
      toast({
        title: "Pendaftaran gagal",
        description: "Terjadi kesalahan saat menambahkan pengguna baru",
        variant: "destructive",
      });
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Pengguna Baru</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Nama Depan</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Nama Belakang</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Peran</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as UserRole)}
              disabled={isLoading}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Pilih peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Pasien</SelectItem>
                <SelectItem value="nurse">Perawat</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
        <CardFooter>
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
              "Tambah Pengguna"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddUserForm;
