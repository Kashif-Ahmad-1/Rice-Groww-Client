import React, { useState, useEffect } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiMinus, HiEye ,HiUsers} from "react-icons/hi"; // Import the eye icon
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserModal from "./AddUserModal";
import ClientDetailsModal from "./ClientDetailsModal"; // Import the new modal
import axios from "axios";
import Swal from 'sweetalert2';
import Footer from "../Layout/Footer";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isClientDetailsModalOpen, setIsClientDetailsModalOpen] = useState(false); // For the client details modal
  const [clientDetails, setClientDetails] = useState([]); // To store the client's assigned data

  const token = localStorage.getItem('token');

  // Fetch users function
  const fetchUsers = async (token, setUsers, setLoading) => {
    setLoading(true);
    try {
      const response = await axios.get("https://veer-rice-backend.onrender.com/api/users/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(token, setUsers, setLoading);
  }, [token]);

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
    fetchUsers(token, setUsers, setLoading);
  };

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const handleDelete = async (id) => {
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
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/users/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      } catch (error) {
        toast.error("Error deleting user:", error);
        Swal.fire('Error!', 'Failed to delete user.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleExpandedRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Handle the eye icon click to open the ClientDetailsModal
  const handleViewClientDetails = (user) => {
    // Dummy data for client details (replace with actual data from API)
    const dummyClientData = [
      { id: 1, name: "Client A", mobileNo: 935696866, address: "Lucknow" },
      { id: 2, name: "Client B", mobileNo: 975986569, address: "Varanasi" },
    ];
    setClientDetails(dummyClientData); // Set dummy data
    setIsClientDetailsModalOpen(true); // Open the modal
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
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">UserName</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold hidden sm:table-cell">Mobile No</th>
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
                    <tr
                      className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200 cursor-pointer"
                      onClick={() => toggleExpandedRow(user._id)}
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{user.username}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{user.mobileNo}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{user.email}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 hidden sm:table-cell">{user.location}</td>
                      <td className="px-4 py-2 text-sm flex space-x-3 items-center">
                         {/* Expand/Collapse Icon for Mobile */}
                         <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpandedRow(user._id);
                          }}
                          className="text-gray-500 hover:text-gray-700 sm:hidden"
                        >
                          {expandedRow === user._id ? <HiMinus size={18} /> : <HiPlus size={18} />}
                        </button>

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
  
                        {/* Eye Icon for Sales Executive */}
                        {user.role === "sales executive" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click from firing
                              handleViewClientDetails(user);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <HiUsers size={18} />
                          </button>
                        )}
  
                       
                      </td>
                    </tr>
  
                    {expandedRow === user._id && (
                      <tr className="bg-gray-100">
                        <td colSpan="6" className="px-4 py-2 text-sm text-gray-700">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="sm:w-1/2">
                              <strong>User Name</strong> {user.username}
                            </div>
                            <div className="sm:w-1/2">
                              <strong>Mobile Number</strong> {user.mobileNo}
                            </div>
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
      </div>
  
      <ToastContainer />
  
      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <AddUserModal onClose={closeAddUserModal} onSubmit={() => fetchUsers(token, setUsers, setLoading)} />
      )}
  
      {/* Client Details Modal */}
      {isClientDetailsModalOpen && (
        <ClientDetailsModal
          onClose={() => setIsClientDetailsModalOpen(false)}
          clientDetails={clientDetails}
        />
      )}

      
    </div>
  );
  

};

export default UsersTable;
