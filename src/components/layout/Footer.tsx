
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-imo-primary flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">IMO</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">IMO MANTAP</h2>
                <p className="text-xs text-gray-600">Ingat Minum Obat</p>
              </div>
            </Link>
            <p className="text-gray-600 text-sm mt-4">
              Solusi digital untuk meningkatkan kepatuhan minum obat pasien hipertensi melalui sistem pengingat yang terintegrasi.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-imo-primary text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-imo-primary text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-imo-primary text-sm">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Login</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login?role=patient" className="text-gray-600 hover:text-imo-primary text-sm">
                  Login Pasien
                </Link>
              </li>
              <li>
                <Link to="/login?role=nurse" className="text-gray-600 hover:text-imo-primary text-sm">
                  Login Perawat
                </Link>
              </li>
              <li>
                <Link to="/login?role=admin" className="text-gray-600 hover:text-imo-primary text-sm">
                  Login Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Kontak</h3>
            <address className="not-italic text-gray-600 text-sm space-y-2">
              <p>Jl. Kesehatan No. 123</p>
              <p>Jakarta Selatan, Indonesia</p>
              <p>Email: info@imomantap.id</p>
              <p>Telepon: (021) 1234-5678</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} IMO MANTAP. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
