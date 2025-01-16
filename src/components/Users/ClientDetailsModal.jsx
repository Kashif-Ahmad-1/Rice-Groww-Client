import React from 'react';

const ClientDetailsModal = ({ onClose, clientDetails }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 sm:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Client Details</h3>
        
        {/* Client Details Table */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left font-semibold">Client Name</th>
              <th className="px-4 py-2 text-left font-semibold">Client Mobile No</th>
              <th className="px-4 py-2 text-left font-semibold">Client Location</th>
            </tr>
          </thead>
          <tbody>
            {clientDetails.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="px-4 py-2">{client.name}</td>
                <td className="px-4 py-2">{client.mobileNo}</td>
                <td className="px-4 py-2">{client.address}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
