
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-imo-primary/90 to-imo-secondary/90 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mulai Tingkatkan Kepatuhan Minum Obat Anda</h2>
          <p className="mb-8 text-white/90">
            Bergabung dengan IMO MANTAP sekarang dan rasakan manfaatnya. 
            Daftar gratis dan mulai perjalanan menuju hidup yang lebih sehat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-imo-primary hover:bg-gray-100 text-lg py-6 px-8">
              <Link to="/register">Daftar Sekarang</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/20 hover:border-white text-lg py-6 px-8">
              <Link to="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
