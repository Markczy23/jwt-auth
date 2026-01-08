import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="font-bold text-lg">🌱 Carbon Credit Platform</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Landing
        </Link>
        <Link to="/received" className="hover:underline">
          Requests Received
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="text-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
