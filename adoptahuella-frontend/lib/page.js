"use client";

import Link from "next/link";

const secciones = [
  {
    titulo: "Usuarios",
    descripcion: "Gestionar usuarios del sistema",
    ruta: "/usuarios",
  },
  {
    titulo: "Refugios",
    descripcion: "Gestionar refugios y fundaciones",
    ruta: "/refugios",
  },
  {
    titulo: "Especies",
    descripcion: "Gestionar especies de mascotas",
    ruta: "/especies",
  },
  {
    titulo: "Mascotas",
    descripcion: "Gestionar mascotas disponibles para adopción",
    ruta: "/mascotas",
  },
];

export default function AreaTrabajo() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Área de Trabajo
        </h1>
        <p className="text-gray-600 mb-8">
          Plataforma AdoptaHuella para la gestión de adopción responsable de mascotas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secciones.map((seccion) => (
            <Link
              key={seccion.ruta}
              href={seccion.ruta}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {seccion.titulo}
              </h2>
              <p className="text-gray-600">{seccion.descripcion}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}