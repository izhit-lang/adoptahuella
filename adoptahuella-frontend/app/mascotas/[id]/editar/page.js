"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "../../../../lib/api";

export default function EditarMascota() {
  const { id } = useParams();
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [idEspecie, setIdEspecie] = useState("");
  const [raza, setRaza] = useState("");
  const [genero, setGenero] = useState("");
  const [idRefugio, setIdRefugio] = useState("");
  const [edadMeses, setEdadMeses] = useState("");
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [especies, setEspecies] = useState([]);
  const [refugios, setRefugios] = useState([]);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datosEspecies = await apiRequest("/especies");
        setEspecies(datosEspecies.data);

        const datosRefugios = await apiRequest("/refugios");
        setRefugios(datosRefugios.data);

        const datosMascota = await apiRequest(`/mascotas/${id}`);
        const m = datosMascota.data;

        setNombre(m.nombre);
        setIdEspecie(m.id_especie);
        setRaza(m.raza);
        setGenero(m.genero);
        setIdRefugio(m.id_refugio);
        setEdadMeses(m.edad_meses || "");
        setEstado(m.estado);
        setDescripcion(m.descripcion || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError("");

    try {
      await apiRequest(`/mascotas/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          nombre,
          id_especie: idEspecie,
          raza,
          genero,
          id_refugio: idRefugio,
          edad_meses: edadMeses,
          estado,
          descripcion,
        }),
      });

      router.push("/mascotas");
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
          Editar mascota
        </h1>

        {cargando && <p>Cargando mascota...</p>}

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
              <label className="block text-gray-700 mb-1">Especie</label>
              <select
                value={idEspecie}
                onChange={(e) => setIdEspecie(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              >
                <option value="">Selecciona una especie</option>

                {especies.map((especie) => (
                  <option
                    key={especie.id_especie}
                    value={especie.id_especie}
                  >
                    {especie.nombre_especie}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Raza</label>
              <input
                type="text"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Género</label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Refugio</label>
              <select
                value={idRefugio}
                onChange={(e) => setIdRefugio(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              >
                <option value="">Selecciona un refugio</option>

                {refugios.map((refugio) => (
                  <option
                    key={refugio.id_refugio}
                    value={refugio.id_refugio}
                  >
                    {refugio.nombre_fundacion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Edad en meses
              </label>
              <input
                type="number"
                value={edadMeses}
                onChange={(e) => setEdadMeses(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Estado</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Selecciona una opción</option>
                <option value="Disponible">Disponible</option>
                <option value="Adoptado">Adoptado</option>
                <option value="En proceso">En proceso</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="3"
              />
            </div>

            <button
              type="submit"
              disabled={guardando}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {guardando ? "Guardando..." : "Actualizar mascota"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}