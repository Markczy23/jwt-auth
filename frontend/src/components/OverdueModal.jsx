export default function OverdueModal({ count, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="font-bold mb-2">⚠ Overdue Requests</h2>
        <p>{count} request(s) are overdue by more than 7 days.</p>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
