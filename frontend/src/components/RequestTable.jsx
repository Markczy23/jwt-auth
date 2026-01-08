export default function RequestTable({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">My Requests</h3>
      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Company</th>
            <th className="text-left py-2">Type</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">Qty</th>
            <th className="text-left py-2">Reason</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="border-t">
              <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              <td>{r.targetCompanyName || "Other Co"}</td>
              <td
                className={r.type === "BUY" ? "text-green-600" : "text-red-600"}
              >
                {r.type}
              </td>
              <td>{r.price}</td>
              <td>{r.quantity}</td>
              <td>{r.reason}</td>
              <td>
                {r.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => onEdit(r)}
                      className="text-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(r.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
