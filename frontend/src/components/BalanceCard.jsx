export default function BalanceCard({ label, value, unit }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">
        {value} <span className="text-sm">{unit}</span>
      </p>
    </div>
  );
}
