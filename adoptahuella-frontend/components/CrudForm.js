"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertMessage from "./AlertMessage";
import FormField from "./FormField";
import SelectField from "./SelectField";

export default function CrudForm({
  title,
  fields,
  initialData = {},
  onSubmit,
  submitLabel = "Guardar",
}) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await onSubmit(formData);
      setSuccess("Operación realizada correctamente.");
      router.push(`/${window.location.pathname.split("/")[1]}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

      <div className="mt-6 grid gap-4">
        {fields.map((field) =>
          field.type === "select" ? (
            <SelectField
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name] ?? ""}
              onChange={handleChange}
              options={field.options || []}
              required={field.required}
            />
          ) : (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={formData[field.name] ?? ""}
              onChange={handleChange}
              required={field.required}
            />
          )
        )}
      </div>

      <div className="mt-6 space-y-4">
        <AlertMessage type="error" message={error} />
        <AlertMessage type="success" message={success} />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}