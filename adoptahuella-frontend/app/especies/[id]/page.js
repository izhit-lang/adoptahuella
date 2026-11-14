"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "../../../lib/api";

export default function VerEspecie() {
  const { id } = useParams();
  const router = useRouter();

  const [especie, setEspecie] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarEspecie = async () => {
      try {
        const data = await apiRequest(`/especies/${id}`);
        setEspecie(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarEspecie();
  }, [id]);

  if (cargando) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Cargando especie...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p className="bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Detalle de la especie
        </h1>

        <div className="space-y-3">
          <p>
            <span className="font-semibold">ID:</span>{" "}
            {especie.id_especie}
          </p>

          <p>
            <span className="font-semibold">Nombre:</span>{" "}
            {especie.nombre_especie}
          </p>

          <p>
            <span className="font-semibold">Descripción:</span>{" "}
            {especie.descripcion}
          </p>
        </div>

        <button
          onClick={() => router.push("/especies")}
          className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Volver
        </button>
      </div>
    </main>
  );
}