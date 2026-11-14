import { apiRequest } from "./api";

export function createCrudService(resource) {
  const base = `/${resource}`;

  return {
    listar: () => apiRequest(base),
    obtenerPorId: (id) => apiRequest(`${base}/${id}`),
    crear: (body) =>
      apiRequest(base, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    actualizar: (id, body) =>
      apiRequest(`${base}/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    eliminar: (id) =>
      apiRequest(`${base}/${id}`, {
        method: "DELETE",
      }),
  };
}