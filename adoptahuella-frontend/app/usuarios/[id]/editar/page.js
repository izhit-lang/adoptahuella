"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "../../../../lib/api";

export default function EditarUsuario() {
  const { id } = useParams();
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol, setRol] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await apiRequest(`/usuarios/${id}`);
        const u = data.data;

        setNombre(u.nombre);
        setCorreo(u.correo);
        setTelefono(u.telefono);
        setRol(u.rol);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError("");

    try {
      await apiRequest(`/usuarios/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          rol,
        }),
      });

      router.push("/usuarios");
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Editar usuario
        </h1>

        {cargando && <p>Cargando usuario...</p>}

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {!cargando && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Correo</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Teléfono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Rol</label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="Administrador">Administrador</option>
                <option value="Refugio">Refugio</option>
                <option value="Adoptante">Adoptante</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={guardando}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {guardando ? "Guardando..." : "Actualizar usuario"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}