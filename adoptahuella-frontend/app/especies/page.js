"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "../../lib/api";

export default function Especies() {
  const [especies, setEspecies] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarEspecies = async () => {
    try {
      const data = await apiRequest("/especies");
      setEspecies(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const eliminarEspecie = async (id) => {
    const confirmar = window.confirm(
      "¿Estás segura de que deseas eliminar esta especie?"
    );

    if (!confirmar) return;

    try {
      await apiRequest(`/especies/${id}`, {
        method: "DELETE",
      });

      cargarEspecies();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarEspecies();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de especies
          </h1>

          <Link
            href="/especies/nuevo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Agregar especie
          </Link>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {cargando ? (
          <p>Cargando especies...</p>
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
                    Descripción
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {especies.map((especie) => (
                  <tr key={especie.id_especie}>
                    <td className="px-6 py-3">{especie.id_especie}</td>

                    <td className="px-6 py-3">
                      {especie.nombre_especie}
                    </td>

                    <td className="px-6 py-3">{especie.descripcion}</td>

                    <td className="px-6 py-3 space-x-3">
                      <Link
                        href={`/especies/${especie.id_especie}`}
                        className="text-blue-600 hover:underline"
                      >
                        Ver
                      </Link>

                      <Link
                        href={`/especies/${especie.id_especie}/editar`}
                        className="text-yellow-600 hover:underline"
                      >
                        Editar
                      </Link>

                      <button
                        onClick={() => eliminarEspecie(especie.id_especie)}
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