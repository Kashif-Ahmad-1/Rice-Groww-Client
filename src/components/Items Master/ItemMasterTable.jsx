import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddItemModal from "./AddItemModal"; // Assume you have an AddItemModal component

const ItemMasterTable = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      productName: "Product A",
      variety: "Variety 1",
      pack: "Pack 1",
    },
    {
      id: 2,
      productName: "Product B",
      variety: "Variety 2",
      pack: "Pack 2",
    },
    {
      id: 3,
      productName: "Product C",
      variety: "Variety 3",
      pack: "Pack 3",
    },
    {
      id: 4,
      productName: "Product D",
      variety: "Variety 4",
      pack: "Pack 4",
    },
  ]);

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleAddItem = () => {
    setIsAddItemModalOpen(true); // Open Add Item Modal
  };

  const closeAddItemModal = () => {
    setIsAddItemModalOpen(false); // Close Add Item Modal
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Item deleted successfully!");
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        {/* Search and Add Item Section */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Items..."
            className="p-2 border border-gray-300 rounded-md shadow-sm w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddItem}
            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Item
          </button>
        </div>

        {/* Item Table */}
        <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-0">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold">S.No</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Product Name</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Variety</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Pack</th>
              <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200"
              >
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.productName}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.variety}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.pack}</td>
                <td className="px-4 py-2 text-sm space-x-3">
                  {/* Edit Button */}
                  <button className="text-blue-500 hover:text-blue-700">
                    <HiOutlinePencil size={18} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item.id)}
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
            <span className="text-xs text-gray-500">Showing 1 to {items.length} of {items.length} items</span>
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

      {/* Add Item Modal */}
      {isAddItemModalOpen && (
        <AddItemModal onClose={closeAddItemModal} onSubmit={() => {}} />
      )}
    </div>
  );
};

export default ItemMasterTable;
