import React from 'react';

const ClientDetailsModal = ({ onClose, clientDetails }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 sm:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Client Details</h3>
        <div>
          {clientDetails.map(client => (
            <div key={client.id} className="mb-4">
              <p><strong>Client Name:</strong> {client.name}</p>
              <p><strong>Client MobileNo:</strong> {client.mobileNo}</p>
              <p><strong>client Address:</strong> {client.address}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
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
