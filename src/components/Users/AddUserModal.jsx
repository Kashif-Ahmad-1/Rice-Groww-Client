import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUserModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("admin"); // Role should be lowercase as per your API
  const [username, setUsername] = useState("");
  const [pswd, setPswd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email: emailId,
      mobileNo,
      username,
      location,
      pswd,
      role: role.toLowerCase(),
    };

    try {
      const response = await fetch("https://veer-rice-backend.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("New User Added");
        // Clear the form inputs after submission
        setName("");
        setMobileNo("");
        setEmailId("");
        setLocation("");
        setUsername("");
        setPswd("");
        setRole("admin");

        // Call the onSubmit function (in your case to fetch the users again)
        onSubmit();
        toast.success("User added successfully!");
        onClose(); // Close the modal after successful submission
      } else {
        toast.error("Failed to add user. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[600px] space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Add New User</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <HiOutlineX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="sales executive">Sales Executive</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                Mobile No
              </label>
              <input
                type="text"
                id="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
                Email Id
              </label>
              <input
                type="email"
                id="emailId"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="pswd" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="pswd"
              value={pswd}
              onChange={(e) => setPswd(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddUserModal;
