
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-white to-imo-light py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              Jangan Lupa <span className="text-imo-primary">Minum Obat</span> untuk 
              <span className="text-imo-primary"> Kesehatan</span> Anda
            </h1>
            <p className="text-lg text-gray-700 md:pr-10">
              IMO MANTAP membantu Anda mengingat jadwal minum obat dengan mudah dan terhubung langsung dengan perawat Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-imo-primary hover:bg-imo-secondary text-lg py-6 px-8">
                <Link to="/register">Daftar Sekarang</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg py-6 px-8">
                <Link to="/about">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-imo-light rounded-full animate-pulse-gentle"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-imo-light rounded-full animate-pulse-gentle"></div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg relative z-10">
              <div className="aspect-video bg-imo-light rounded-xl flex items-center justify-center pill-bounce">
                <div className="rounded-full w-20 h-20 bg-imo-primary flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">IMO</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-imo-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-medium">Pengingat Otomatis</p>
                    <p className="text-sm text-gray-600">Notifikasi tepat waktu</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-imo-secondary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-medium">Terhubung dengan Perawat</p>
                    <p className="text-sm text-gray-600">Monitoring kepatuhan</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-imo-accent flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-medium">Laporan Kesehatan</p>
                    <p className="text-sm text-gray-600">Pantau perkembangan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
