import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi"; // Import + icon

const AddRMModal = ({ onClose, onSubmit }) => {
  // State to manage multiple raw materials
  const [items, setItems] = useState([{ category: "", name: "", type: "" }]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    // Add a new empty item to the list
    setItems([...items, { category: "", name: "", type: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call onSubmit function passed from parent to handle adding the new items
    onSubmit(items);

    // Reset the items array
    setItems([{ category: "", name: "", type: "" }]);

    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3">
        <h3 className="text-xl font-semibold mb-4">Add Raw Materials</h3>
        <form onSubmit={handleSubmit}>
          {items.map((item, index) => (
            <div key={index} className="flex mb-4 space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) => handleChange(index, "category", e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter category"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Name of Item</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter item name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  value={item.type}
                  onChange={(e) => handleChange(index, "type", e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter type"
                />
              </div>
            </div>
          ))}

          {/* Add more items button */}
          <div className="flex justify-start mb-4">
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
            >
              <HiOutlinePlus className="mr-2" size={20} />
              Add More Items
            </button>
          </div>

          {/* Modal footer */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Add Items
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRMModal;
