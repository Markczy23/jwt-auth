import { useEffect, useState } from "react";
import api from "../api/api";

export default function RequestForm({ editing, onSuccess }) {
  const [type, setType] = useState("BUY");
  const [targetCompanyId, setTargetCompanyId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (editing) {
      setType(editing.type);
      setTargetCompanyId(editing.targetCompanyId);
      setPrice(editing.price);
      setQuantity(editing.quantity);
      setReason(editing.reason);
    } else {
      reset();
    }
  }, [editing]);

  const reset = () => {
    setType("BUY");
    setTargetCompanyId("");
    setPrice("");
    setQuantity("");
    setReason("");
  };

  const submit = async () => {
    const payload = {
      type,
      targetCompanyId: Number(targetCompanyId),
      price: Number(price),
      quantity: Number(quantity),
      reason,
    };

    if (editing) {
      //own code
      const updatedPayload = { ...editing, ...payload };

      //put back later this just to prevent error
      //await api.put(`/requests/${editing.id}`, updatedPayload);

      //TODO remove mock
      await api.put(`/requests-outgoing/${editing.id}`, updatedPayload);
    } else {
      // await api.post("/requests", payload);

      //TODO remove mock
      //unnecessary time date data:
      // Create a new Date object for the current time
      const now = new Date();

      // Format it as an ISO string (includes milliseconds by default)
      const isoStringWithMilliseconds = now.toISOString();
      // Example output: "2026-01-08T04:42:05.010Z" (exact output varies)

      // To get the exact format "YYYY-MM-DDTHH:mm:ssZ" (without milliseconds)
      const isoStringWithoutMilliseconds =
        isoStringWithMilliseconds.split(".")[0] + "Z";
      // Example output: "2026-01-08T04:42:05Z" (exact output varies)

      const targetCompanyName = (await api.get(`/companies/${targetCompanyId}`))
        .data.name;
      const mockPayload = {
        ...payload,
        createdAt: `${isoStringWithoutMilliseconds}`,
        targetCompanyName,
        status: "PENDING",
      };

      await api.post("/requests", mockPayload);

      //TODO remove mock
      await api.post(`/requests-outgoing`, mockPayload);
    }

    reset();
    onSuccess();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        {editing ? "Edit Request" : "Create Request"}
      </h3>

      <div className="grid grid-cols-6 gap-2">
        <select
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>BUY</option>
          <option>SELL</option>
        </select>

        <input
          className="border p-2 rounded"
          placeholder="Target Co ID"
          value={targetCompanyId}
          onChange={(e) => setTargetCompanyId(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          className="border p-2 rounded col-span-2"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={submit}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          {editing ? "Update" : "Submit"}
        </button>
        {editing && (
          <button
            onClick={() => {
              reset();
              onSuccess();
            }}
            className="border px-4 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
