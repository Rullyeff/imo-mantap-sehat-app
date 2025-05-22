import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, PlusCircle, Clock, X, Check, AlarmClock, Pill } from "lucide-react";

interface Prescription {
  id: string;
  medicine: {
    name: string;
    description: string;
  };
  dosage: string;
  frequency: string;
  instructions: string;
}

interface MedicationLog {
  id: string;
  taken_at: string;
  status: string;
  prescription: Prescription;
}

const PatientDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPrescriptions();
      fetchMedicationLogs();
    }
  }, [user]);

  const fetchPrescriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          id, 
          dosage, 
          frequency, 
          instructions,
          medicines (
            id, 
            name, 
            description
          )
        `)
        .eq('patient_id', user?.id)
        .eq('active', true);

      if (error) {
        console.error('Error fetching prescriptions:', error);
        return;
      }

      const formattedPrescriptions = data.map((item: any) => ({
        id: item.id,
        medicine: {
          name: item.medicines.name,
          description: item.medicines.description,
        },
        dosage: item.dosage,
        frequency: item.frequency,
        instructions: item.instructions,
      }));

      setPrescriptions(formattedPrescriptions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setLoading(false);
    }
  };

  const fetchMedicationLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('medication_logs')
        .select(`
          id, 
          taken_at, 
          status, 
          prescriptions (
            id,
            dosage, 
            frequency, 
            instructions,
            medicines (
              id, 
              name, 
              description
            )
          )
        `)
        .eq('patient_id', user?.id)
        .order('taken_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching medication logs:', error);
        return;
      }

      const formattedLogs = data.map((item: any) => ({
        id: item.id,
        taken_at: item.taken_at,
        status: item.status,
        prescription: {
          id: item.prescriptions.id,
          medicine: {
            name: item.prescriptions.medicines.name,
            description: item.prescriptions.medicines.description,
          },
          dosage: item.prescriptions.dosage,
          frequency: item.prescriptions.frequency,
          instructions: item.prescriptions.instructions,
        }
      }));

      setMedicationLogs(formattedLogs);
    } catch (error) {
      console.error('Error fetching medication logs:', error);
    }
  };

  const logMedication = async (prescriptionId: string, status: 'taken' | 'skipped') => {
    try {
      const { data, error } = await supabase
        .from('medication_logs')
        .insert({
          prescription_id: prescriptionId,
          patient_id: user?.id,
          status: status,
          taken_at: new Date().toISOString()
        });

      if (error) {
        toast({
          title: "Gagal mencatat konsumsi obat",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: status === 'taken' ? "Obat berhasil diminum" : "Obat dilewati",
        description: status === 'taken' 
          ? "Terima kasih sudah minum obat tepat waktu." 
          : "Konsumsi obat telah dicatat sebagai dilewati.",
      });

      fetchMedicationLogs();
    } catch (error) {
      toast({
        title: "Gagal mencatat konsumsi obat",
        description: "Terjadi kesalahan saat mencatat konsumsi obat",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Selamat Datang, {profile?.first_name || 'Pasien'}</h1>
          <p className="text-gray-600">
            Pantau jadwal minum obat dan riwayat pengobatan Anda di sini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="bg-imo-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <AlarmClock className="mr-2" /> Pengingat Hari Ini
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {loading ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-imo-primary" />
                  </div>
                ) : prescriptions.length > 0 ? (
                  <div className="space-y-4">
                    {prescriptions.map((prescription) => (
                      <div key={prescription.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold flex items-center">
                          <Pill className="mr-2 h-5 w-5" /> {prescription.medicine.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{prescription.dosage} - {prescription.frequency}</p>
                        <p className="text-xs text-gray-500 mt-1">{prescription.instructions}</p>
                        
                        <div className="flex space-x-2 mt-3">
                          <Button 
                            size="sm"
                            onClick={() => logMedication(prescription.id, 'taken')}
                            className="flex items-center bg-green-600 hover:bg-green-700"
                          >
                            <Check className="mr-1 h-4 w-4" /> Sudah Minum
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => logMedication(prescription.id, 'skipped')}
                            className="flex items-center text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <X className="mr-1 h-4 w-4" /> Lewati
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Tidak ada pengingat obat aktif saat ini.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Activity History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-imo-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Clock className="mr-2" /> Riwayat Konsumsi Obat
                </CardTitle>
                <CardDescription className="text-gray-100">
                  10 aktivitas konsumsi obat terbaru
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {medicationLogs.length > 0 ? (
                  <div className="space-y-4">
                    {medicationLogs.map((log) => (
                      <div key={log.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{log.prescription.medicine.name}</h3>
                            <p className="text-sm text-gray-600">{log.prescription.dosage}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs 
                            ${log.status === 'taken' ? 'bg-green-100 text-green-800' : 
                              log.status === 'skipped' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'}`}
                          >
                            {log.status === 'taken' ? 'Diminum' : 
                              log.status === 'skipped' ? 'Dilewati' : 'Tidak Diminum'}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(log.taken_at).toLocaleString('id-ID', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada riwayat konsumsi obat.
                  </p>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-center">
                <Button variant="ghost" className="text-imo-primary flex items-center">
                  <PlusCircle className="mr-1 h-4 w-4" /> Lihat Semua Riwayat
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PatientDashboard;
