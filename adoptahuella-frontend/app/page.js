import Link from "next/link";

const modulos = [
  {
    href: "/usuarios",
    titulo: "Usuarios",
    descripcion: "Administrar los usuarios del sistema.",
    icono: "👤",
  },
  {
    href: "/refugios",
    titulo: "Refugios",
    descripcion: "Administrar refugios y fundaciones.",
    icono: "🏠",
  },
  {
    href: "/especies",
    titulo: "Especies",
    descripcion: "Administrar las especies de mascotas.",
    icono: "🐾",
  },
  {
    href: "/mascotas",
    titulo: "Mascotas",
    descripcion: "Administrar las mascotas disponibles.",
    icono: "🐶",
  },
];

export default function AreaTrabajo() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800">Área de Trabajo</h1>
      <p className="mt-2 text-slate-600">
        Selecciona un módulo para administrar la información de AdoptaHuella.
      </p>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        {modulos.map((modulo) => (
          <Link
            key={modulo.href}
            href={modulo.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-3xl">{modulo.icono}</span>
            <h2 className="mt-3 text-xl font-semibold text-slate-800">
              {modulo.titulo}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{modulo.descripcion}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}