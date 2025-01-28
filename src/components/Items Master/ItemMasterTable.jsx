import React, { useState, useEffect } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddItemModal from "./AddItemModal"; // Assume you have an AddItemModal component
import axios from "axios";

const ItemMasterTable = () => {
  const [items, setItems] = useState([]);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

 // Fetch items from the API
 const fetchItems = async () => {
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const response = await axios.get("https://veer-rice-backend.onrender.com/api/products/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setItems(response.data);
    setLoading(false);
  } catch (error) {
    toast.error("Failed to load items.");
    setLoading(false);
  }
};

useEffect(() => {
  fetchItems(); // Call fetchItems when the component mounts
}, []);

  const handleAddItem = () => {
    setIsAddItemModalOpen(true);
   
  };

  const closeAddItemModal = () => {
    setIsAddItemModalOpen(false); // Close Add Item Modal
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      await axios.delete(`https://veer-rice-backend.onrender.com/api/products/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(items.filter((item) => item._id !== id));
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete item.");
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        {/* Search and Add Item Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search Items..."
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-darkRed text-white rounded-md hover:bg-darkRedDark focus:outline-none focus:ring-2 focus:ring-darkRed w-full sm:w-auto"
          >
            Add Item
          </button>
        </div>

        {/* Item Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-0">
            <thead className="bg-darkRed text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold">S.No</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Product Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Variety</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Pack</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{item.productName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{item.variety}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{item.pack}</td>
                    <td className="px-4 py-2 text-sm space-x-3 flex items-center">
                      {/* Edit Button */}
                      <button className="text-blue-500 hover:text-blue-700">
                        <HiOutlinePencil size={18} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-gray-500">
            Showing 1 to {items.length} of {items.length} items
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

      {/* Add Item Modal */}
      {isAddItemModalOpen && (
        <AddItemModal onClose={closeAddItemModal} onSubmit={() => {fetchItems()}} />
      )}
    </div>
  );
};

export default ItemMasterTable;
