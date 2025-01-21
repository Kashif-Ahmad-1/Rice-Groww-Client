import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddRMModal from "./AddRMModal"; // Assume you have an AddRMModal component

const RMMasterTable = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // For search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [itemsPerPage] = useState(50); // Set items per page
  const [isAddRMModalOpen, setIsAddRMModalOpen] = useState(false);

  // Fetch raw materials from the API
  const fetchRawMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/rmproducts/rmproducts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRawMaterials(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load raw materials.");
      setLoading(false);
    }
  };

  // Delete a raw material from the API
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/rmproducts/rmproducts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRawMaterials(rawMaterials.filter((material) => material._id !== id));
      toast.success("Raw Material deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete raw material.");
    }
  };

  useEffect(() => {
    fetchRawMaterials(); // Fetch raw materials on component mount
  }, []);

  // Filter raw materials based on the search query
  const filteredRawMaterials = rawMaterials.filter((material) => {
    return (
      material.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.varities.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate the data to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRawMaterials.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddRM = () => {
    setIsAddRMModalOpen(true); // Open Add RM Modal
  };

  const closeAddRMModal = () => {
    setIsAddRMModalOpen(false); // Close Add RM Modal
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        {/* Search and Add RM Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search Raw Materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddRM}
            className="px-4 py-2 bg-darkRed text-white rounded-md hover:bg-darkRedDark focus:outline-none focus:ring-2 focus:ring-darkRed w-full sm:w-auto"
          >
            Add Raw Material
          </button>
        </div>

        {/* RM Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto rounded-lg overflow-hidden shadow-md border-separate border-spacing-0">
            <thead className="bg-darkRed text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold">S.No</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Type</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Category</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Name of Item</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Varieties</th>
                <th className="px-4 py-2 text-left text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : (
                currentItems.map((material, index) => (
                  <tr
                    key={material._id}
                    className="hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{material.itemtype}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{material.categoryName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{material.itemName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{material.varities}</td>
                    <td className="px-4 py-2 text-sm flex space-x-3 items-center">
                      {/* Edit Button */}
                      <button className="text-blue-500 hover:text-blue-700">
                        <HiOutlinePencil size={18} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(material._id)}
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
            Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredRawMaterials.length} items
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Prev
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= filteredRawMaterials.length}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container for displaying toast messages */}
      <ToastContainer />

      {/* Add RM Modal */}
      {isAddRMModalOpen && (
        <AddRMModal onClose={closeAddRMModal} onSubmit={fetchRawMaterials} />
      )}
    </div>
  );
};

export default RMMasterTable;
