
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Users, Database, Activity, PlusCircle, ShieldCheck, User, HeartPulse } from "lucide-react";

interface UserCount {
  role: string;
  count: number;
}

const AdminDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalNurses: 0,
    totalMedicines: 0,
    totalPrescriptions: 0
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchRecentUsers();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      // Get user counts by querying the user_roles table directly
      const { data: patientRoles, error: patientError } = await supabase
        .from('user_roles')
        .select('count')
        .eq('role', 'patient')
        .single();

      const { data: nurseRoles, error: nurseError } = await supabase
        .from('user_roles')
        .select('count')
        .eq('role', 'nurse')
        .single();

      if (!patientError && patientRoles) {
        setStats(prev => ({ ...prev, totalPatients: Number(patientRoles.count) || 0 }));
      } else {
        // Fall back to manual counting
        const { data: patientData, error: patientDataError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('role', 'patient');
          
        if (!patientDataError && patientData) {
          setStats(prev => ({ ...prev, totalPatients: patientData.length }));
        }
      }

      if (!nurseError && nurseRoles) {
        setStats(prev => ({ ...prev, totalNurses: Number(nurseRoles.count) || 0 }));
      } else {
        // Fall back to manual counting
        const { data: nurseData, error: nurseDataError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('role', 'nurse');
          
        if (!nurseDataError && nurseData) {
          setStats(prev => ({ ...prev, totalNurses: nurseData.length }));
        }
      }
      
      // Get medicine count
      const { count: medicineCount, error: medicineError } = await supabase
        .from('medicines')
        .select('*', { count: 'exact', head: true });
        
      if (!medicineError) {
        setStats(prev => ({ ...prev, totalMedicines: medicineCount || 0 }));
      }
      
      // Get prescription count
      const { count: prescriptionCount, error: prescriptionError } = await supabase
        .from('prescriptions')
        .select('*', { count: 'exact', head: true });
        
      if (!prescriptionError) {
        setStats(prev => ({ ...prev, totalPrescriptions: prescriptionCount || 0 }));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const fetchRecentUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*, user_roles!inner(*)')
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (profilesError) {
        console.error('Error fetching recent users:', profilesError);
        return;
      }
      
      setRecentUsers(profiles);
    } catch (error) {
      console.error('Error fetching recent users:', error);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'patient': return 'Pasien';
      case 'nurse': return 'Perawat';
      case 'admin': return 'Admin';
      default: return role;
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'patient':
        return 'bg-blue-100 text-blue-800';
      case 'nurse':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">
            Selamat datang, {profile?.first_name || 'Admin'}. Kelola pengguna, obat, dan pantau aktivitas sistem.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Users className="mr-2 h-5 w-5" /> Pasien
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.totalPatients}</p>
              <p className="text-sm text-gray-500 mt-1">Total pasien terdaftar</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-green-700">
                <HeartPulse className="mr-2 h-5 w-5" /> Perawat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.totalNurses}</p>
              <p className="text-sm text-gray-500 mt-1">Total perawat terdaftar</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-amber-700">
                <Database className="mr-2 h-5 w-5" /> Obat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.totalMedicines}</p>
              <p className="text-sm text-gray-500 mt-1">Total jenis obat</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-indigo-700">
                <Activity className="mr-2 h-5 w-5" /> Resep
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.totalPrescriptions}</p>
              <p className="text-sm text-gray-500 mt-1">Total resep aktif</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Users */}
        <Card className="mb-8">
          <CardHeader className="bg-imo-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <User className="mr-2" /> Pengguna Terbaru
            </CardTitle>
            <CardDescription className="text-gray-100">
              Daftar pengguna yang baru mendaftar
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-imo-primary" />
              </div>
            ) : recentUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 pl-4">Nama</th>
                      <th className="pb-3">Peran</th>
                      <th className="pb-3">Terdaftar</th>
                      <th className="pb-3 text-right pr-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 pl-4">
                          {user.first_name} {user.last_name}
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeClass(user.user_roles[0]?.role)}`}>
                            {getRoleLabel(user.user_roles[0]?.role)}
                          </span>
                        </td>
                        <td className="py-4">
                          {new Date(user.created_at).toLocaleDateString('id-ID')}
                        </td>
                        <td className="py-4 text-right pr-4">
                          <Button size="sm" variant="outline">
                            Detail
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Belum ada pengguna terdaftar.
              </p>
            )}
          </CardContent>
          {recentUsers.length > 0 && (
            <CardFooter className="border-t pt-4 flex justify-center">
              <Button variant="ghost" className="text-imo-primary flex items-center">
                <User className="mr-1 h-4 w-4" /> Kelola Semua Pengguna
              </Button>
            </CardFooter>
          )}
        </Card>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" /> Kelola Pengguna
              </CardTitle>
              <CardDescription>
                Tambah, edit, atau hapus akun pengguna
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pengguna Baru
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> Kelola Obat
              </CardTitle>
              <CardDescription>
                Kelola basis data obat dan dosisnya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Obat Baru
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5" /> Pengaturan Sistem
              </CardTitle>
              <CardDescription>
                Konfigurasi dan keamanan sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Buka Pengaturan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
