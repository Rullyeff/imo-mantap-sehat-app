
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pasien Hipertensi",
      content:
        "IMO MANTAP sangat membantu saya mengingat jadwal minum obat. Saya tidak pernah lupa lagi dan tekanan darah saya lebih stabil sekarang.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Siti Rahayu",
      role: "Perawat",
      content:
        "Sebagai perawat, saya bisa memantau kepatuhan pasien saya dengan mudah. Aplikasi ini sangat memudahkan pekerjaan saya dalam mengawasi pasien hipertensi.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Ahmad",
      role: "Dokter Spesialis Jantung",
      content:
        "IMO MANTAP adalah solusi yang sangat baik untuk meningkatkan kepatuhan pasien dalam mengonsumsi obat. Saya merekomendasikan kepada semua pasien hipertensi saya.",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka</h2>
          <p className="text-gray-600">
            Dengarkan pengalaman mereka yang telah menggunakan IMO MANTAP dalam meningkatkan
            kepatuhan minum obat dan kesehatan mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
