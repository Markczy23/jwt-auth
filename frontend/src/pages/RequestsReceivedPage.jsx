import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import OverdueModal from "../components/OverdueModal";

export default function RequestsReceivedPage() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showOverdue, setShowOverdue] = useState(false);

  const load = async () => {
    const data = (await api.get("/requests/incoming")).data;
    setRequests(data);

    const overdue = data.filter(
      (r) => (Date.now() - new Date(r.createdAt)) / (1000 * 60 * 60 * 24) > 7
    );
    setShowOverdue(overdue.length > 0);
  };

  useEffect(() => {
    load();
  }, []);

  const bulk = async (action) => {
    await Promise.all(
      selected.map((id) => api.post(`/requests/${id}/${action}`))
    );
    setSelected([]);
    load();
  };

  return (
    <>
      <Navbar />
      {showOverdue && (
        <OverdueModal
          count={requests.length}
          onClose={() => setShowOverdue(false)}
        />
      )}

      <div className="p-6 bg-white rounded-xl shadow m-6">
        <div className="mb-3 space-x-2">
          <button
            onClick={() => bulk("accept")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Bulk Accept
          </button>
          <button
            onClick={() => bulk("reject")}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Bulk Reject
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th></th>
              <th>Date</th>
              <th>Company</th>
              <th>Type</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t">
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(r.id)}
                    onChange={() =>
                      setSelected((s) =>
                        s.includes(r.id)
                          ? s.filter((i) => i !== r.id)
                          : [...s, r.id]
                      )
                    }
                  />
                </td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td>{r.requestorCompanyName}</td>
                <td>{r.type}</td>
                <td>{r.price}</td>
                <td>{r.quantity}</td>
                <td>{r.reason}</td>
                <td>
                  <button
                    onClick={() =>
                      api.post(`/requests/${r.id}/accept`).then(load)
                    }
                    className="text-green-600 mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      api.post(`/requests/${r.id}/reject`).then(load)
                    }
                    className="text-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
