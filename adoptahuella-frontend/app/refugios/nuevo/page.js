"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../../lib/api";

export default function CrearRefugio() {
  const router = useRouter();

  const [idUsuario, setIdUsuario] = useState("");
  const [nombreFundacion, setNombreFundacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError("");

    try {
      await apiRequest("/refugios", {
        method: "POST",
        body: JSON.stringify({
          id_usuario: idUsuario,
          nombre_fundacion: nombreFundacion,
          direccion,
          ciudad,
        }),
      });

      router.push("/refugios");
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
          Agregar refugio
        </h1>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">
              ID del usuario responsable
            </label>
            <input
              type="number"
              value={idUsuario}
              onChange={(e) => setIdUsuario(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Nombre de la fundación
            </label>
            <input
              type="text"
              value={nombreFundacion}
              onChange={(e) => setNombreFundacion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Ciudad</label>
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {guardando ? "Guardando..." : "Guardar refugio"}
          </button>
        </form>
      </div>
    </main>
  );
}