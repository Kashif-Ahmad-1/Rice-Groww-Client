import React, { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

const AddUserModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("Admin"); // Default role is Admin

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy logic for adding user (you can replace it with actual logic)
    const newUser = {
      id: Date.now(), // You can generate a unique ID (e.g., using Date.now())
      role,
      name,
      mobileNo,
      emailId,
      location,
    };

    console.log("New User Added:", newUser);

    // Clear the form inputs after submission
    setName("");
    setMobileNo("");
    setEmailId("");
    setLocation("");
    setRole("Admin"); // Reset role to default after submission

    // Call the onSubmit function (in your case to fetch the users again)
    onSubmit();
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <HiOutlineX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="Admin">Admin</option>
              <option value="Sales Executive">Sales Executive</option>
              <option value="Client">Client</option>
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">Mobile No</label>
            <input
              type="text"
              id="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">Email Id</label>
            <input
              type="email"
              id="emailId"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
