import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddRMModal from "./AddRMModal"; // Assume you have an AddRMModal component

const RMMasterTable = () => {
  const [rawMaterials, setRawMaterials] = useState([
    {
      id: 1,
      category: "Category A",
      name: "Raw Material 1",
      type: "Type 1",
    },
    {
      id: 2,
      category: "Category B",
      name: "Raw Material 2",
      type: "Type 2",
    },
    {
      id: 3,
      category: "Category C",
      name: "Raw Material 3",
      type: "Type 3",
    },
    {
      id: 4,
      category: "Category D",
      name: "Raw Material 4",
      type: "Type 4",
    },
  ]);

  const [isAddRMModalOpen, setIsAddRMModalOpen] = useState(false);

  const handleAddRM = () => {
    setIsAddRMModalOpen(true); // Open Add RM Modal
  };

  const closeAddRMModal = () => {
    setIsAddRMModalOpen(false); // Close Add RM Modal
  };

  const handleDelete = (id) => {
    setRawMaterials(rawMaterials.filter((material) => material.id !== id));
    toast.success("Raw Material deleted successfully!");
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        {/* Search and Add RM Section */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Raw Materials..."
            className="p-2 border border-gray-300 rounded-md shadow-sm w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddRM}
            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Raw Material
          </button>
        </div>

        {/* RM Table */}
        <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-0">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold">S.No</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Category</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Name of Item</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Type</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {rawMaterials.map((material, index) => (
              <tr
                key={material.id}
                className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200"
              >
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{material.category}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{material.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{material.type}</td>
                <td className="px-4 py-2 text-sm space-x-3">
                  {/* Edit Button */}
                  <button className="text-blue-500 hover:text-blue-700">
                    <HiOutlinePencil size={18} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(material.id)}
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
            <span className="text-xs text-gray-500">Showing 1 to {rawMaterials.length} of {rawMaterials.length} items</span>
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

      {/* Add RM Modal */}
      {isAddRMModalOpen && (
        <AddRMModal onClose={closeAddRMModal} onSubmit={() => {}} />
      )}
    </div>
  );
};

export default RMMasterTable;
