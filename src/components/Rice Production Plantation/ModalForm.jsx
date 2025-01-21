import { useState } from "react";
import { PlusCircle } from "lucide-react"; // Import the PlusCircle icon

export default function ModalForm({ isOpen, onClose, onSave }) {
  // Initial state for form entries
  const initialEntries = [{ productType: "", percentage: "", bagSize: "", quantity: "" }];
  const [entries, setEntries] = useState(initialEntries);

  // Update entry field value based on index
  const handleChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  // Add a new entry to the form
  const handleAddEntry = () => {
    setEntries([
      ...entries,
      { productType: "", percentage: "", bagSize: "", quantity: "" },
    ]);
  };

  // Save the form data and close the modal
  const handleSave = () => {
    onSave(entries); // Save the entries
    setEntries(initialEntries); // Reset entries to initial state
    onClose(); // Close the modal
  };

  // Handle cancel (reset the form and close modal)
  const handleCancel = () => {
    setEntries(initialEntries); // Reset entries to initial state
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[900px]">
        <h2 className="text-xl font-medium mb-4">Add Paddy/Rice Details</h2>

        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index}>
              {/* Inputs in a single row */}
              <div className="flex gap-4 items-end">
                {/* Product Type (Paddy/Rice) */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Type
                  </label>
                  <select
                    value={entry.productType}
                    onChange={(e) =>
                      handleChange(index, "productType", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="" disabled>
                      Select product type
                    </option>
                    <option value="rice">Rice</option>
                    <option value="paddy">Paddy</option>
                  </select>
                </div>

                {/* Percentage */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Percentage
                  </label>
                  <input
                    type="text"
                    value={entry.percentage}
                    onChange={(e) =>
                      handleChange(index, "percentage", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter Percentage"
                  />
                </div>

                {/* Bag Size */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Bag Size
                  </label>
                  <input
                    type="text"
                    value={entry.bagSize}
                    onChange={(e) =>
                      handleChange(index, "bagSize", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter Bag Size"
                  />
                </div>

                {/* Quantity */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={entry.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter Quantity"
                  />
                </div>
              </div>

              {/* Add more entry button */}
              {index === entries.length - 1 && (
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handleAddEntry}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel} // Use the handleCancel function here
            className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
