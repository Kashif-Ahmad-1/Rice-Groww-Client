import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddClientModal from "./AddClientModal";

const ClientMasterTable = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      customerName: "ABC Corp",
      contactPerson: "John Doe",
      mobileNo: "123-456-7890",
      emailId: "john.doe@abccorp.com",
      location: "New York, USA",
      salesExeName: "Alice Johnson",
    },
    {
      id: 2,
      customerName: "XYZ Ltd.",
      contactPerson: "Jane Smith",
      mobileNo: "987-654-3210",
      emailId: "jane.smith@xyzltd.com",
      location: "Los Angeles, USA",
      salesExeName: "Bob Williams",
    },
    {
      id: 3,
      customerName: "Tech Innovators",
      contactPerson: "Michael Brown",
      mobileNo: "555-555-5555",
      emailId: "michael.brown@techinnovators.com",
      location: "Chicago, USA",
      salesExeName: "Carol White",
    },
    {
      id: 4,
      customerName: "Creative Solutions",
      contactPerson: "Emily Clark",
      mobileNo: "111-222-3333",
      emailId: "emily.clark@creativesolutions.com",
      location: "San Francisco, USA",
      salesExeName: "David Green",
    },
  ]);

  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const handleAddClient = (newClient) => {
    setClients((prevClients) => [
      ...prevClients,
      { id: prevClients.length + 1, ...newClient },
    ]);
    toast.success("Client added successfully!");
  };

  const handleDelete = (id) => {
    setClients(clients.filter((client) => client.id !== id));
    toast.success("Client deleted successfully!");
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        {/* Search and Add Client Section */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Clients..."
            className="p-2 border border-gray-300 rounded-md shadow-sm w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setIsAddClientModalOpen(true)}
            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Client
          </button>
        </div>

        {/* Client Table */}
        <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-0">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold">Customer Name</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Contact Person</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Mobile No</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Email Id</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Location</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Sales Exe Name</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-4 py-2 text-sm text-gray-700">{client.customerName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{client.contactPerson}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{client.mobileNo}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{client.emailId}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{client.location}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{client.salesExeName}</td>
                <td className="px-4 py-2 text-sm space-x-3">
                  {/* Edit Button */}
                  <button className="text-blue-500 hover:text-blue-700">
                    <HiOutlinePencil size={18} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500">Showing 1 to {clients.length} of {clients.length} clients</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none">
              Prev
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container for displaying toast messages */}
      <ToastContainer />

      {/* Add Client Modal */}
      {isAddClientModalOpen && (
        <AddClientModal
          onClose={() => setIsAddClientModalOpen(false)}
          onSubmit={handleAddClient}
        />
      )}
    </div>
  );
};

export default ClientMasterTable;
