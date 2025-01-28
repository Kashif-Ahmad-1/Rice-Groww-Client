import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddRMModal from "./AddRMModal"; // Assume you have an AddRMModal component
import EditRMModal from "./EditRMModal"; // Add the EditRMModal component

const RMMasterTable = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [isAddRMModalOpen, setIsAddRMModalOpen] = useState(false);
  const [isEditRMModalOpen, setIsEditRMModalOpen] = useState(false);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState(null);

  const fetchRawMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://veer-rice-backend.onrender.com/api/rmproducts/rmproducts", {
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://veer-rice-backend.onrender.com/api/rmproducts/rmproducts/${id}`, {
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

  const handleEdit = (material) => {
    setSelectedRawMaterial(material);
    setIsEditRMModalOpen(true);
  };

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const filteredRawMaterials = rawMaterials.filter((material) => {
    return (
      material.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.varities.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRawMaterials.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddRM = () => {
    setIsAddRMModalOpen(true);
  };

  const closeAddRMModal = () => {
    setIsAddRMModalOpen(false);
  };

  const closeEditRMModal = () => {
    setIsEditRMModalOpen(false);
    setSelectedRawMaterial(null);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search Raw Materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddRM}
            className="px-4 py-2 bg-darkRed text-white rounded-md hover:bg-darkRedDark focus:outline-none focus:ring-2 focus:ring-darkRed w-full sm:w-auto"
          >
            Add Raw Material
          </button>
        </div>

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
                      <button
                        onClick={() => handleEdit(material)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <HiOutlinePencil size={18} />
                      </button>
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

      <ToastContainer />

      {isAddRMModalOpen && (
        <AddRMModal onClose={closeAddRMModal} onSubmit={fetchRawMaterials} />
      )}

      {isEditRMModalOpen && selectedRawMaterial && (
        <EditRMModal
          rawMaterial={selectedRawMaterial}
          onClose={closeEditRMModal}
          onSubmit={fetchRawMaterials}
        />
      )}
    </div>
  );
};

export default RMMasterTable;
