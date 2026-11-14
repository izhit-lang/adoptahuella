"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-emerald-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          🐾 AdoptaHuella
        </Link>

        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-emerald-200">
            Área de Trabajo
          </Link>

          <Link href="/usuarios" className="hover:text-emerald-200">
            Usuarios
          </Link>

          <Link href="/refugios" className="hover:text-emerald-200">
            Refugios
          </Link>

          <Link href="/especies" className="hover:text-emerald-200">
            Especies
          </Link>

          <Link href="/mascotas" className="hover:text-emerald-200">
            Mascotas
          </Link>
        </nav>
      </div>
    </header>
  );
}