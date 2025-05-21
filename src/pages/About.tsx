
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <MainLayout>
      <section className="py-12 bg-gradient-to-b from-imo-light to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Tentang IMO MANTAP</h1>
            <p className="text-lg text-gray-700">
              Mengenal lebih jauh tentang sistem pengingat minum obat 
              yang membantu meningkatkan kepatuhan pasien hipertensi.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visi & Misi Kami</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-imo-primary">Visi</h3>
                  <p className="text-gray-700">
                    Menjadi platform terdepan dalam meningkatkan kepatuhan minum obat 
                    dan kualitas hidup pasien hipertensi di Indonesia.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-imo-primary">Misi</h3>
                  <ul className="space-y-2 text-gray-700 list-disc pl-5">
                    <li>
                      Menyediakan solusi digital yang mudah digunakan untuk mengingat jadwal minum obat
                    </li>
                    <li>
                      Membangun koneksi efektif antara pasien, perawat, dan administrator kesehatan
                    </li>
                    <li>
                      Meningkatkan kesadaran akan pentingnya kepatuhan minum obat untuk pasien hipertensi
                    </li>
                    <li>
                      Mendorong gaya hidup sehat dan manajemen kesehatan yang lebih baik
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
                alt="Healthcare professional with patient" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-imo-primary/20 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">Mengapa IMO MANTAP?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-imo-light flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-imo-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Mudah Digunakan</h3>
                <p className="text-gray-600">
                  Antarmuka yang intuitif dan sederhana memastikan semua pengguna, 
                  termasuk lansia, dapat dengan mudah menggunakan aplikasi.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-imo-light flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-imo-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Aman & Terjamin</h3>
                <p className="text-gray-600">
                  Data pasien terenkripsi dan terlindungi dengan baik. 
                  Keamanan dan privasi adalah prioritas utama kami.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-14 w-14 rounded-lg bg-imo-light flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-imo-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Hemat Biaya</h3>
                <p className="text-gray-600">
                  Mengurangi biaya kesehatan jangka panjang dengan mencegah komplikasi 
                  akibat ketidakpatuhan minum obat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Tim Kami</h2>
            <p className="text-gray-700 mb-10">
              IMO MANTAP dikembangkan oleh tim profesional dengan pengalaman di bidang kesehatan dan teknologi, 
              yang berdedikasi untuk meningkatkan kualitas hidup pasien hipertensi.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Dr. Arif Wibowo" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold">Dr. Arif Wibowo</h3>
                <p className="text-sm text-gray-600">Dokter Spesialis Jantung</p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Rina Mardhiyah" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold">Rina Mardhiyah</h3>
                <p className="text-sm text-gray-600">Kepala Perawat</p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/67.jpg" 
                  alt="Budi Prakoso" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold">Budi Prakoso</h3>
                <p className="text-sm text-gray-600">Pengembang Aplikasi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
