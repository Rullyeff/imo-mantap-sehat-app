
import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Daftar Akun",
      description: "Buat akun sesuai peran Anda sebagai pasien, perawat, atau administrator.",
    },
    {
      number: "02",
      title: "Atur Jadwal Obat",
      description: "Tambahkan obat dan jadwal minum sesuai dengan resep dokter Anda.",
    },
    {
      number: "03",
      title: "Terima Pengingat",
      description: "Dapatkan notifikasi saat waktu minum obat telah tiba.",
    },
    {
      number: "04",
      title: "Konfirmasi & Pantau",
      description: "Konfirmasi bahwa Anda telah minum obat dan pantau riwayat kepatuhan Anda.",
    },
  ];

  return (
    <section className="py-20 bg-imo-light">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cara Kerja IMO MANTAP</h2>
          <p className="text-gray-700">
            IMO MANTAP mudah digunakan dengan empat langkah sederhana untuk membantu Anda mengelola pengobatan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 left-full w-full h-0.5 bg-imo-primary/30 -z-10"></div>
              )}
              
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="text-4xl font-bold text-imo-primary mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
