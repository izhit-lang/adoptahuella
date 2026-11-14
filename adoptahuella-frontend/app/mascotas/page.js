"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "../../lib/api";

export default function Mascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarMascotas = async () => {
    try {
      const data = await apiRequest("/mascotas");
      setMascotas(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const eliminarMascota = async (id) => {
    const confirmar = window.confirm(
      "¿Estás segura de que deseas eliminar esta mascota?"
    );

    if (!confirmar) return;

    try {
      await apiRequest(`/mascotas/${id}`, {
        method: "DELETE",
      });

      cargarMascotas();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de mascotas
          </h1>

          <Link
            href="/mascotas/nuevo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Crear mascota
          </Link>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {cargando ? (
          <p>Cargando mascotas...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nombre
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Edad
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Sexo
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {mascotas.map((mascota) => (
                  <tr key={mascota.id_mascota}>
                    <td className="px-6 py-3">{mascota.id_mascota}</td>

                    <td className="px-6 py-3">{mascota.nombre}</td>

                    <td className="px-6 py-3">
                      {mascota.edad_meses !== null
                        ? `${mascota.edad_meses} meses`
                        : "No registrada"}
                    </td>

                    <td className="px-6 py-3">{mascota.genero}</td>

                    <td className="px-6 py-3">{mascota.estado}</td>

                    <td className="px-6 py-3 space-x-3">
                      <Link
                        href={`/mascotas/${mascota.id_mascota}`}
                        className="text-blue-600 hover:underline"
                      >
                        Ver
                      </Link>

                      <Link
                        href={`/mascotas/${mascota.id_mascota}/editar`}
                        className="text-yellow-600 hover:underline"
                      >
                        Editar
                      </Link>

                      <button
                        onClick={() => eliminarMascota(mascota.id_mascota)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}