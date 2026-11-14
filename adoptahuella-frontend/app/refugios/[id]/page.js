"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "../../../lib/api";

export default function VerRefugio() {
  const { id } = useParams();
  const router = useRouter();

  const [refugio, setRefugio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarRefugio = async () => {
      try {
        const data = await apiRequest(`/refugios/${id}`);
        setRefugio(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarRefugio();
  }, [id]);

  if (cargando) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Cargando refugio...</p>
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
          Detalle del refugio
        </h1>

        <div className="space-y-3">
          <p>
            <span className="font-semibold">ID:</span>{" "}
            {refugio.id_refugio}
          </p>

          <p>
            <span className="font-semibold">Fundación:</span>{" "}
            {refugio.nombre_fundacion}
          </p>

          <p>
            <span className="font-semibold">Dirección:</span>{" "}
            {refugio.direccion}
          </p>

          <p>
            <span className="font-semibold">Ciudad:</span>{" "}
            {refugio.ciudad}
          </p>

          <p>
            <span className="font-semibold">Teléfono:</span>{" "}
            {refugio.telefono_contacto || "No registrado"}
          </p>
        </div>

        <button
          onClick={() => router.push("/refugios")}
          className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Volver
        </button>
      </div>
    </main>
  );
}