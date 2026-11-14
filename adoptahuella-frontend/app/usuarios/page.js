"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "../../lib/api";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarUsuarios = async () => {
    try {
      const data = await apiRequest("/usuarios");
      setUsuarios(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm(
      "¿Estás segura de que deseas eliminar este usuario?"
    );

    if (!confirmar) return;

    try {
      await apiRequest(`/usuarios/${id}`, {
        method: "DELETE",
      });

      cargarUsuarios();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de usuarios
          </h1>

          <Link
            href="/usuarios/nuevo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Agregar usuario
          </Link>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {cargando ? (
          <p>Cargando usuarios...</p>
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
                    Correo
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Teléfono
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rol
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id_usuario}>
                    <td className="px-6 py-3">{usuario.id_usuario}</td>

                    <td className="px-6 py-3">{usuario.nombre}</td>

                    <td className="px-6 py-3">{usuario.correo}</td>

                    <td className="px-6 py-3">{usuario.telefono}</td>

                    <td className="px-6 py-3">{usuario.rol}</td>

                    <td className="px-6 py-3 space-x-3">
                      <Link
                        href={`/usuarios/${usuario.id_usuario}`}
                        className="text-blue-600 hover:underline"
                      >
                        Ver
                      </Link>

                      <Link
                        href={`/usuarios/${usuario.id_usuario}/editar`}
                        className="text-yellow-600 hover:underline"
                      >
                        Editar
                      </Link>

                      <button
                        onClick={() => eliminarUsuario(usuario.id_usuario)}
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