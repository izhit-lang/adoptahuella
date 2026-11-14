export default function AlertMessage({ type = "info", message }) {
  if (!message) return null;

  const estilos = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    error: "bg-red-50 text-red-700 border-red-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
  };

  return (
    <div className={`rounded-lg border p-3 text-sm ${estilos[type]}`}>
      {message}
    </div>
  );
}