import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRMModal = ({ rawMaterial, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    itemName: "",
    itemtype: "",
    varities: "",
  });

  useEffect(() => {
    setFormData({
      categoryName: rawMaterial.categoryName,
      itemName: rawMaterial.itemName,
      itemtype: rawMaterial.itemtype,
      varities: rawMaterial.varities,
    });
  }, [rawMaterial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/rmproducts/rmproducts/${rawMaterial._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Raw material updated successfully!");
      onSubmit();
      onClose();
    } catch (error) {
      toast.error("Failed to update raw material.");
      console.error("Failed to update raw material", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Raw Material
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>

          {/* Item Name */}
          <div>
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item name"
            />
          </div>

          {/* Item Type */}
          <div>
            <label
              htmlFor="itemtype"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Item Type
            </label>
            <input
              type="text"
              id="itemtype"
              name="itemtype"
              value={formData.itemtype}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item type"
            />
          </div>

          {/* Varieties */}
          <div>
            <label
              htmlFor="varities"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Varieties
            </label>
            <input
              type="text"
              id="varities"
              name="varities"
              value={formData.varities}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter varieties"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default EditRMModal;
