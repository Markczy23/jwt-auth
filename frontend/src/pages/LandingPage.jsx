import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import RequestForm from "../components/RequestForm";
import RequestTable from "../components/RequestTable";

export default function LandingPage() {
  const [balances, setBalances] = useState({});
  const [requests, setRequests] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setBalances((await api.get("/balances")).data);
    setRequests((await api.get("/requests/outgoing")).data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <BalanceCard
            label="Carbon Credits"
            value={balances.carbon}
            unit="tCO₂"
          />
          <BalanceCard label="Cash Balance" value={balances.cash} unit="SGD" />
        </div>

        <RequestForm
          editing={editing}
          onSuccess={() => {
            setEditing(null);
            load();
          }}
        />

        <RequestTable
          data={requests}
          onEdit={setEditing}
          onDelete={async (id) => {
            await api.delete(`/requests/${id}`);
            //TODO remove mock
            await api.delete(`/requests-outgoing/${id}`);
            load();
          }}
        />
      </div>
    </>
  );
}
