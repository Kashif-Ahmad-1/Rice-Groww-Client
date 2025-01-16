import React, { useState, useEffect } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserModal from "./AddUserModal";
import axios from "axios";
import Swal from 'sweetalert2';
const UsersTable = () => {
  const [users, setUsers] = useState([]);  // Initialize users as an empty array
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded
  const [loading, setLoading] = useState(false); // Loading state for API fetch

  const token = localStorage.getItem('token'); // Replace with the actual token

// Define fetchUsers as a reusable function
const fetchUsers = async (token, setUsers, setLoading) => {
  setLoading(true); // Set loading state
  try {
    const response = await axios.get("https://veer-rice-backend.onrender.com/api/users/users", {
      headers: {
        Authorization: `Bearer ${token}`, // Set token in the Authorization header
      },
    });
    setUsers(response.data); // Set users with the fetched data
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users!");
  } finally {
    setLoading(false); // Set loading state to false
  }
};

// Use the reusable function in your useEffect
useEffect(() => {
  
  fetchUsers(token, setUsers, setLoading);
}, [token]);

  const handleAddUser = () => {
    setIsAddUserModalOpen(true); // Open Add User Modal
    fetchUsers(token, setUsers, setLoading);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false); // Close Add User Modal
  };

  const handleDelete = async (id) => {
    // Use SweetAlert for confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        setLoading(true); // Set loading state
        await axios.delete(`http://localhost:5000/api/users/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        // If successful, update the users list
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire('Deleted!', 'The user has been deleted.', 'success'); // Success alert
      } catch (error) {
        toast.error("Error deleting user:", error);
        Swal.fire('Error!', 'Failed to delete user.', 'error'); // Error alert
      } finally {
        setLoading(false); // Reset loading state
      }
    }
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
                <th className="px-4 py-2 text-left text-xs font-semibold">UserName</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Mobile No</th>
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">Email Id</th>
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">Location</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                users.map((user) => (
                  <React.Fragment key={user._id}>
                    {/* Main Row */}
                    <tr
                      className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200 cursor-pointer"
                      onClick={() => toggleExpandedRow(user._id)} // Toggle on row click
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.mobileNo}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{user.email}</td>
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
                            handleDelete(user._id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                        {/* Expand/Collapse Icon for Mobile */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click from firing
                            toggleExpandedRow(user._id);
                          }}
                          className="text-gray-500 hover:text-gray-700 sm:hidden"
                        >
                          {expandedRow === user._id ? <HiMinus size={18} /> : <HiPlus size={18} />}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row for Mobile */}
                    {expandedRow === user._id && (
                      <tr className="bg-gray-100">
                        <td colSpan="6" className="px-4 py-2 text-sm text-gray-700">
                          {/* Show expanded data */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="sm:w-1/2">
                              <strong>Email Id:</strong> {user.email}
                            </div>
                            <div className="sm:w-1/2">
                              <strong>Location:</strong> {user.location}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
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
        <AddUserModal onClose={closeAddUserModal} onSubmit={() => fetchUsers(token, setUsers, setLoading)} />
      )}
    </div>
  );
};

export default UsersTable;
