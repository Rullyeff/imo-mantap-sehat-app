
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, User, PlusCircle } from "lucide-react";

const NursePatients: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
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
        setLoading(false);
        return;
      }

      const patientIds = nursePatients.map(np => np.patient_id);
      
      const { data: patientProfiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', patientIds);

      if (profileError) {
        console.error('Error fetching patient profiles:', profileError);
        setLoading(false);
        return;
      }

      setPatients(patientProfiles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           patient.phone?.includes(searchQuery);
  });

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Daftar Pasien</h1>
          <p className="text-gray-600">
            Kelola dan monitor semua pasien yang Anda tangani.
          </p>
        </div>
        
        <Card>
          <CardHeader className="bg-imo-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <User className="mr-2" /> Data Pasien
            </CardTitle>
            <CardDescription className="text-gray-100">
              Daftar pasien yang ditangani
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="py-4">
              <div className="flex justify-between mb-6">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Cari pasien..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pasien
                </Button>
              </div>
              
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-imo-primary" />
                </div>
              ) : filteredPatients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-3 pl-4">Nama Lengkap</th>
                        <th className="pb-3">Kontak</th>
                        <th className="pb-3">Tanggal Terdaftar</th>
                        <th className="pb-3 text-right pr-4">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr key={patient.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 pl-4">
                            {patient.first_name} {patient.last_name}
                          </td>
                          <td className="py-4">
                            {patient.phone || "-"}
                          </td>
                          <td className="py-4">
                            {new Date(patient.created_at).toLocaleDateString('id-ID')}
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
                  <div className="mx-auto mb-3 p-3 flex justify-center">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Tidak ada pasien</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery ? 'Tidak ada hasil yang cocok dengan pencarian Anda.' : 'Anda belum memiliki pasien yang terdaftar.'}
                  </p>
                  {!searchQuery && (
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Tambah Pasien Baru
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
};

export default NursePatients;
