import { useState } from "react";
import { PlusCircle } from "lucide-react"; // Import the PlusCircle icon

export default function ModalForm({ isOpen, onClose, onSave, productType,riceData,
  paddyData }) {
  const initialEntries = [{ mixingproductType: "", percentage: "", bagSize: "", quantity: "" }];
  const [entries, setEntries] = useState(initialEntries);

  const riceTypes = ["Rice Type 1", "Rice Type 2"]; // You can dynamically fetch this data from your API
  const paddyTypes = ["Paddy Type 1", "Paddy Type 2"]; // Similarly, fetch paddy types as needed

  const handleChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { mixingproductType: "", percentage: "", bagSize: "", quantity: "" }]);
  };

  const handleSave = () => {
    onSave(entries); 
    setEntries(initialEntries);
    onClose();
  };

  const handleCancel = () => {
    setEntries(initialEntries);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[900px]">
        <h2 className="text-xl font-medium mb-4">Add Paddy/Rice Details</h2>

        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index}>
              <div className="flex gap-4 items-end">
                {/* Mixing Product Type */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Mixing Product Type
                  </label>
                  <select
                    value={entry.mixingproductType}
                    onChange={(e) =>
                      handleChange(index, "mixingproductType", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="" disabled>Select Mixing Product Type</option>
                    {productType === "rice"
                      ? Object.keys(riceData).map((type, idx) => (
                          <option key={idx} value={type}>{type}</option>
                        ))
                      : productType === "paddy" &&
                        Object.keys(paddyData).map((type, idx) => (
                          <option key={idx} value={type}>{type}</option>
                        ))}
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
            onClick={handleCancel}
            className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

