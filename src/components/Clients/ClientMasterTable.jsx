import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";
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
  const [expandedRow, setExpandedRow] = useState(null); // Track expanded row

  const handleAddClient = () => {
    setIsAddClientModalOpen(true); // Open Add Client Modal
  };

  const closeAddClientModal = () => {
    setIsAddClientModalOpen(false); // Close Add Client Modal
  };

  const handleDelete = (id) => {
    setClients(clients.filter((client) => client.id !== id));
    toast.success("Client deleted successfully!");
  };

  const toggleExpandedRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id); // Toggle expanded state
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        {/* Search and Add Client Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search Clients..."
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddClient}
            className="px-4 py-2 bg-darkRed text-white rounded-md hover:bg-darkRedDark focus:outline-none focus:ring-2 focus:ring-darkRed w-full sm:w-auto"
          >
            Add Client
          </button>
        </div>

        {/* Client Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-0">
            <thead className="bg-darkRed text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold">Customer Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Contact Person</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Mobile No</th>
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">Email Id</th>
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">Location</th>
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">Sales Exe Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clients.map((client) => (
                <React.Fragment key={client.id}>
                  {/* Main Row */}
                  <tr
                    className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200 cursor-pointer"
                    onClick={() => toggleExpandedRow(client.id)} // Toggle on row click
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">{client.customerName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{client.contactPerson}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{client.mobileNo}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{client.emailId}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{client.location}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{client.salesExeName}</td>
                    <td className="px-4 py-2 text-sm flex space-x-3 items-center">
                      {/* Edit Button */}
                      <button className="text-blue-500 hover:text-blue-700">
                        <HiOutlinePencil size={18} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from firing
                          handleDelete(client.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                      {/* Expand/Collapse Icon for Mobile */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from firing
                          toggleExpandedRow(client.id);
                        }}
                        className="text-gray-500 hover:text-gray-700 sm:hidden"
                      >
                        {expandedRow === client.id ? <HiMinus size={18} /> : <HiPlus size={18} />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row for Mobile */}
                  {expandedRow === client.id && (
                    <tr className="bg-gray-100">
                      <td colSpan="7" className="px-4 py-2 text-sm text-gray-700">
                        {/* Show expanded data */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="sm:w-1/2">
                            <strong>Email Id:</strong> {client.emailId}
                          </div>
                          <div className="sm:w-1/2">
                            <strong>Location:</strong> {client.location}
                          </div>
                          <div className="sm:w-1/2">
                            <strong>Sales Exe Name:</strong> {client.salesExeName}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-gray-500">
            Showing 1 to {clients.length} of {clients.length} clients
          </span>
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
        <AddClientModal onClose={closeAddClientModal} onSubmit={() => {}} />
      )}
    </div>
  );
};

export default ClientMasterTable;
