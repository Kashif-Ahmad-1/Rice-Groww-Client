import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi"; // Import + icon

const AddItemModal = ({ onClose, onSubmit }) => {
  // State to manage multiple items
  const [items, setItems] = useState([
    { productName: "", variety: "", pack: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    // Add a new empty item to the list
    setItems([...items, { productName: "", variety: "", pack: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call onSubmit function passed from parent to handle adding the new items
    onSubmit(items);

    // Reset the items array
    setItems([{ productName: "", variety: "", pack: "" }]);

    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Add New Items</h3>
        <form onSubmit={handleSubmit}>
          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
              <div className="flex-1 mb-2 sm:mb-0">
                <label htmlFor={`productName-${index}`} className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id={`productName-${index}`}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={item.productName}
                  onChange={(e) => handleChange(index, "productName", e.target.value)}
                  required
                />
              </div>
  
              <div className="flex-1 mb-2 sm:mb-0">
                <label htmlFor={`variety-${index}`} className="block text-sm font-medium text-gray-700">
                  Variety
                </label>
                <input
                  type="text"
                  id={`variety-${index}`}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={item.variety}
                  onChange={(e) => handleChange(index, "variety", e.target.value)}
                  required
                />
              </div>
  
              <div className="flex-1 mb-2 sm:mb-0">
                <label htmlFor={`pack-${index}`} className="block text-sm font-medium text-gray-700">
                  Pack
                </label>
                <input
                  type="text"
                  id={`pack-${index}`}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={item.pack}
                  onChange={(e) => handleChange(index, "pack", e.target.value)}
                  required
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

export default AddItemModal;
