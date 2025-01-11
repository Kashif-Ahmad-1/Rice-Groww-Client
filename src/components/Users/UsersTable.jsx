import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
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

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        {/* Search and Add User Section */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Users..."
            className="p-2 border border-gray-300 rounded-md shadow-sm w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddUser}
            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </div>

        {/* User Table */}
        <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-0">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold">Role</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Mobile No</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Email Id</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Location</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200"
              >
                <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.mobileNo}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.emailId}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.location}</td>
                <td className="px-4 py-2 text-sm space-x-3">
                  {/* Edit Button */}
                  <button className="text-blue-500 hover:text-blue-700">
                    <HiOutlinePencil size={18} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(user.id)}
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
            <span className="text-xs text-gray-500">Showing 1 to {users.length} of {users.length} users</span>
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

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddUserModal onClose={closeAddUserModal} onSubmit={() => {}} />
      )}
    </div>
  );
};

export default UsersTable;
