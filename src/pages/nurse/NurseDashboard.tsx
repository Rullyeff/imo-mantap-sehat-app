
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Users, PlusCircle, ClipboardList, User, Badge, BarChart3, PieChart } from "lucide-react";
import { Link } from "react-router-dom";

interface Patient {
  id: string;
  profile: {
    first_name: string;
    last_name: string;
    phone: string | null;
  };
  activeCount: number;
  adherenceRate: number;
}

const NurseDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePrescriptions: 0,
    overallAdherence: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  const fetchPatients = async () => {
    try {
      const { data: nursePatients, error: nurseError } = await supabase
        .from('nurse_patients')
        .select('patient_id')
        .eq('nurse_id', user?.id);

      if (nurseError) {
        console.error('Error fetching nurse patients:', nurseError);
        setLoading(false);
        return;
      }

      if (!nursePatients || nursePatients.length === 0) {
        setPatients([]);
        setStats({
          totalPatients: 0,
          activePrescriptions: 0,
          overallAdherence: 0
        });
        setLoading(false);
        return;
      }

      const patientIds = nursePatients.map(np => np.patient_id);
      
      // Fetch profiles for all patients
      const { data: patientProfiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', patientIds);

      if (profileError) {
        console.error('Error fetching patient profiles:', profileError);
        setLoading(false);
        return;
      }

      // Fetch active prescriptions count for each patient
      const patientData: Patient[] = [];
      let totalPrescriptions = 0;
      let adherentCount = 0;

      for (const id of patientIds) {
        // Get active prescriptions
        const { data: prescriptions, error: prescError } = await supabase
          .from('prescriptions')
          .select('id')
          .eq('patient_id', id)
          .eq('active', true);
          
        if (prescError) {
          console.error('Error fetching prescriptions:', prescError);
          continue;
        }
        
        const activeCount = prescriptions?.length || 0;
        totalPrescriptions += activeCount;
        
        // Calculate adherence rate
        const { data: logCounts, error: logError } = await supabase
          .from('medication_logs')
          .select('status')
          .eq('patient_id', id)
          .order('taken_at', { ascending: false })
          .limit(10);
          
        if (logError) {
          console.error('Error fetching medication logs:', logError);
          continue;
        }
        
        const takenCount = logCounts?.filter(log => log.status === 'taken').length || 0;
        const adherenceRate = logCounts?.length > 0 
          ? Math.round((takenCount / logCounts.length) * 100) 
          : 0;
          
        adherentCount += takenCount;
        
        const patientProfile = patientProfiles.find(p => p.id === id);
        if (patientProfile) {
          patientData.push({
            id,
            profile: {
              first_name: patientProfile.first_name,
              last_name: patientProfile.last_name,
              phone: patientProfile.phone,
            },
            activeCount,
            adherenceRate
          });
        }
      }

      setPatients(patientData);
      
      // Calculate overall statistics
      const totalLogs = patientData.reduce(
        (sum, patient) => sum + (patient.adherenceRate > 0 ? 10 : 0), 0);
      const overallAdherence = totalLogs > 0 
        ? Math.round((adherentCount / totalLogs) * 100) 
        : 0;
        
      setStats({
        totalPatients: patientIds.length,
        activePrescriptions: totalPrescriptions,
        overallAdherence: overallAdherence
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Selamat Datang, {profile?.first_name || 'Perawat'}</h1>
          <p className="text-gray-600">
            Monitor pasien dan pantau kepatuhan minum obat dari dashboard ini.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-blue-700">
                <Users className="mr-2 h-5 w-5" /> Jumlah Pasien
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.totalPatients}</p>
              <p className="text-sm text-gray-500 mt-1">Pasien yang ditangani</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-indigo-700">
                <ClipboardList className="mr-2 h-5 w-5" /> Resep Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.activePrescriptions}</p>
              <p className="text-sm text-gray-500 mt-1">Total resep obat aktif</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-green-700">
                <BarChart3 className="mr-2 h-5 w-5" /> Tingkat Kepatuhan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats.overallAdherence}%</p>
              <p className="text-sm text-gray-500 mt-1">Rata-rata kepatuhan minum obat</p>
            </CardContent>
          </Card>
        </div>

        {/* Patient List */}
        <Card>
          <CardHeader className="bg-imo-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <User className="mr-2" /> Daftar Pasien
            </CardTitle>
            <CardDescription className="text-gray-100">
              Monitor dan kelola pengobatan pasien Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-imo-primary" />
              </div>
            ) : patients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 pl-4">Nama Pasien</th>
                      <th className="pb-3">Kontak</th>
                      <th className="pb-3 text-center">Resep Aktif</th>
                      <th className="pb-3 text-center">Kepatuhan</th>
                      <th className="pb-3 text-right pr-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 pl-4">
                          {patient.profile.first_name} {patient.profile.last_name}
                        </td>
                        <td className="py-4">
                          {patient.profile.phone || "-"}
                        </td>
                        <td className="py-4 text-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {patient.activeCount} resep
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs
                            ${patient.adherenceRate >= 80 ? 'bg-green-100 text-green-800' : 
                              patient.adherenceRate >= 50 ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {patient.adherenceRate}%
                          </span>
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
              <div className="text-center py-8">
                <Badge className="mx-auto mb-3 p-3" variant="outline">
                  <Users className="h-6 w-6 text-gray-400" />
                </Badge>
                <h3 className="text-lg font-semibold mb-1">Belum Ada Pasien</h3>
                <p className="text-gray-500 mb-4">
                  Anda belum memiliki pasien yang terdaftar.
                </p>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pasien Baru
                </Button>
              </div>
            )}
          </CardContent>
          {patients.length > 0 && (
            <CardFooter className="border-t pt-4 flex justify-center">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pasien
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default NurseDashboard;
