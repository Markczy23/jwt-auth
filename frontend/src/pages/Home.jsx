import { useState } from "react";
import api from "../api/api";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import RequestTable from "../components/RequestTable";
import IncomingRequestTable from "../components/IncomingRequestTable";
import RequestForm from "../components/RequestForm";

function Home() {
  const [balances, setBalances] = useState();
  const [requests, setRequests] = useState([]);
  const [editing, setEditing] = useState(null);
  const id = 1;

  useEffect(() => {
    load();
  }, []);

  const loadReal = async () => {
    setBalances((await api.get("/balances")).data);
    setRequests((await api.get("/requests/outgoing")).data);
  };

  const load = () => {
    setBalances(mockBalances);
    setRequests(mockRequests);
  };

  const mockBalances = {
    id: 1,
    carbonBalance: 5000,
    cashBalance: 8000,
  };

  const mockRequests = [
    {
      id: 1,
      requestDate: "2025-02-07",
      companyName: "ABC Company",
      carbonPrice: 450,
      carbonQuantity: 100,
      requestingReason: "Need for more carbon credits",
      requestType: "BUY",
      status: "PENDING",
    },
    {
      id: 2,
      requestDate: "2026-01-07",
      companyName: "Bedega Company",
      carbonPrice: 230,
      carbonQuantity: 120,
      requestingReason: "Need for cheap credits",
      requestType: "BUY",
      status: "PENDING",
    },
    {
      id: 3,
      requestDate: "2026-01-02",
      companyName: "Hogwash Company",
      carbonPrice: 500,
      carbonQuantity: 80,
      requestingReason: "Letting go excess credits",
      requestType: "SELL",
      status: "PENDING",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-6 space-y-6">
        {balances && (
          <div className="grid grid-cols-2 gap-4">
            <BalanceCard
              label="Carbon Credits"
              value={balances.carbonBalance}
              unit="tCO₂"
            />
            <BalanceCard
              label="Cash Balance"
              value={balances.cashBalance}
              unit="SGD"
            />
          </div>
        )}
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
            load();
          }}
        />
      </div>

      {/* <div>
        {requests.length == 0 ? (
          <div>
            <h1>Loading Requests...</h1>
          </div>
        ) : (
          <ul>
            {requests.map((request) => (
              <li key={request.requestId}>
                <div>
                  <h4>Request made to: {request.companyName}</h4>
                  <h5>Date: {request.requestDate}</h5>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
}

export default Home;
