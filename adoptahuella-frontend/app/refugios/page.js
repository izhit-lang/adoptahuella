"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "../../lib/api";

export default function Refugios() {
  const [refugios, setRefugios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarRefugios = async () => {
    try {
      const data = await apiRequest("/refugios");
      setRefugios(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const eliminarRefugio = async (id) => {
    const confirmar = window.confirm(
      "¿Estás segura de que deseas eliminar este refugio?"
    );

    if (!confirmar) return;

    try {
      await apiRequest(`/refugios/${id}`, {
        method: "DELETE",
      });

      cargarRefugios();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarRefugios();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de refugios
          </h1>

          <Link
            href="/refugios/nuevo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Agregar refugio
          </Link>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {cargando ? (
          <p>Cargando refugios...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Fundación
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Dirección
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ciudad
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Teléfono
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {refugios.map((refugio) => (
                  <tr key={refugio.id_refugio}>
                    <td className="px-6 py-3">{refugio.id_refugio}</td>

                    <td className="px-6 py-3">
                      {refugio.nombre_fundacion}
                    </td>

                    <td className="px-6 py-3">{refugio.direccion}</td>

                    <td className="px-6 py-3">{refugio.ciudad}</td>

                    <td className="px-6 py-3">
                      {refugio.telefono_contacto || "No registrado"}
                    </td>

                    <td className="px-6 py-3 space-x-3">
                      <Link
                        href={`/refugios/${refugio.id_refugio}`}
                        className="text-blue-600 hover:underline"
                      >
                        Ver
                      </Link>

                      <Link
                        href={`/refugios/${refugio.id_refugio}/editar`}
                        className="text-yellow-600 hover:underline"
                      >
                        Editar
                      </Link>

                      <button
                        onClick={() => eliminarRefugio(refugio.id_refugio)}
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