export default function DataTable({ columns, rows, actions }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left font-semibold text-slate-600"
              >
                {column.label}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-right font-semibold text-slate-600">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-slate-700">
                  {row[column.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-right">{actions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}