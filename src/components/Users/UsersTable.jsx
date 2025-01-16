import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserModal from "./AddUserModal";

const UsersTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      role: "Admin",
      name: "John Doe",
      mobileNo: "123-456-7890",
      emailId: "john.doe@example.com",
      location: "New York, USA",
    },
    {
      id: 2,
      role: "User",
      name: "Jane Smith",
      mobileNo: "987-654-3210",
      emailId: "jane.smith@example.com",
      location: "Los Angeles, USA",
    },
    {
      id: 3,
      role: "Editor",
      name: "Michael Brown",
      mobileNo: "555-555-5555",
      emailId: "michael.brown@example.com",
      location: "Chicago, USA",
    },
    {
      id: 4,
      role: "User",
      name: "Emily Clark",
      mobileNo: "111-222-3333",
      emailId: "emily.clark@example.com",
      location: "San Francisco, USA",
    },
  ]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded

  const handleAddUser = () => {
    setIsAddUserModalOpen(true); // Open Add User Modal
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false); // Close Add User Modal
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully!");
  };

  const toggleExpandedRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id); // Toggle expanded state
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        {/* Search and Add User Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search Users..."
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-darkRed text-white rounded-md hover:bg-darkRedDark focus:outline-none focus:ring-2 focus:ring-darkRed w-full sm:w-auto"
          >
            Add User
          </button>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-0">
            <thead className="bg-darkRed text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold">Role</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Mobile No</th>
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">Email Id</th>
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">Location</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  {/* Main Row */}
                  <tr
                    className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200 cursor-pointer"
                    onClick={() => toggleExpandedRow(user.id)} // Toggle on row click
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{user.mobileNo}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{user.emailId}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{user.location}</td>
                    <td className="px-4 py-2 text-sm flex space-x-3 items-center">
                      {/* Edit Button */}
                      <button className="text-blue-500 hover:text-blue-700">
                        <HiOutlinePencil size={18} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from firing
                          handleDelete(user.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                      {/* Expand/Collapse Icon for Mobile */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from firing
                          toggleExpandedRow(user.id);
                        }}
                        className="text-gray-500 hover:text-gray-700 sm:hidden"
                      >
                        {expandedRow === user.id ? <HiMinus size={18} /> : <HiPlus size={18} />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row for Mobile */}
                  {expandedRow === user.id && (
                    <tr className="bg-gray-100">
                      <td colSpan="6" className="px-4 py-2 text-sm text-gray-700">
                        {/* Show expanded data */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="sm:w-1/2">
                            <strong>Email Id:</strong> {user.emailId}
                          </div>
                          <div className="sm:w-1/2">
                            <strong>Location:</strong> {user.location}
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
            Showing 1 to {users.length} of {users.length} users
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

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddUserModal onClose={closeAddUserModal} onSubmit={() => {}} />
      )}
    </div>
  );
};

export default UsersTable;
