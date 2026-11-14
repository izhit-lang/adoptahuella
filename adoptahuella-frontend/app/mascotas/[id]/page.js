"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "../../../lib/api";

export default function VerMascota() {
  const { id } = useParams();
  const router = useRouter();

  const [mascota, setMascota] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarMascota = async () => {
      try {
        const data = await apiRequest(`/mascotas/${id}`);
        setMascota(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarMascota();
  }, [id]);

  if (cargando) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p>Cargando mascota...</p>
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
          Detalle de la mascota
        </h1>

        <div className="space-y-3">
          <p>
            <span className="font-semibold">ID:</span>{" "}
            {mascota.id_mascota}
          </p>

          <p>
            <span className="font-semibold">Nombre:</span>{" "}
            {mascota.nombre}
          </p>

          <p>
            <span className="font-semibold">Especie:</span>{" "}
            {mascota.id_especie}
          </p>

          <p>
            <span className="font-semibold">Raza:</span>{" "}
            {mascota.raza}
          </p>

          <p>
            <span className="font-semibold">Edad:</span>{" "}
            {mascota.edad_meses !== null
              ? `${mascota.edad_meses} meses`
              : "No registrada"}
          </p>

          <p>
            <span className="font-semibold">Género:</span>{" "}
            {mascota.genero}
          </p>

          <p>
            <span className="font-semibold">Estado:</span>{" "}
            {mascota.estado}
          </p>

          <p>
            <span className="font-semibold">Refugio:</span>{" "}
            {mascota.id_refugio}
          </p>
        </div>

        <div className="mt-6 space-x-3">
          <button
            onClick={() => router.push("/mascotas")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Volver
          </button>

          <button
            onClick={() => router.push(`/mascotas/${id}/editar`)}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
          >
            Editar
          </button>
        </div>
      </div>
    </main>
  );
}