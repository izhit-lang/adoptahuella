"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "../../../../lib/api";

export default function EditarEspecie() {
  const { id } = useParams();
  const router = useRouter();

  const [nombreEspecie, setNombreEspecie] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarEspecie = async () => {
      try {
        const data = await apiRequest(`/especies/${id}`);
        const e = data.data;

        setNombreEspecie(e.nombre_especie);
        setDescripcion(e.descripcion);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarEspecie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError("");

    try {
      await apiRequest(`/especies/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          nombre_especie: nombreEspecie,
          descripcion,
        }),
      });

      router.push("/especies");
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
          Editar especie
        </h1>

        {cargando && <p>Cargando especie...</p>}

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {!cargando && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Nombre de la especie
              </label>
              <input
                type="text"
                value={nombreEspecie}
                onChange={(e) => setNombreEspecie(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              disabled={guardando}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {guardando ? "Guardando..." : "Actualizar especie"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}