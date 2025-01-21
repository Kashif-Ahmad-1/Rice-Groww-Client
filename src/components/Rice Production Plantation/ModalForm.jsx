import { useState } from "react";

export default function ModalForm({ isOpen, onClose, onSave }) {
  const [productType, setProductType] = useState("");
  const [percentage, setPercentage] = useState("");
  const [bagSize, setBagSize] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSave = () => {
    const data = { productType, percentage, bagSize, quantity };
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-medium mb-4">Add Paddy/Rice Details</h2>

        <div className="space-y-4">
          

          <div>
            <label className="block text-sm font-medium text-gray-700">Percentage</label>
            <input
              type="text"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Percentage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bag Size</label>
            <input
              type="text"
              value={bagSize}
              onChange={(e) => setBagSize(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Bag Size"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Quantity"
            />
          </div>
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
            onClick={onClose}
            className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
