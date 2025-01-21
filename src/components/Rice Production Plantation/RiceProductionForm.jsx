import { useState, useEffect } from "react";
import { PlusCircle, XCircle } from "lucide-react"; // Importing XCircle for the delete button
import DatePicker from "react-datepicker"; // Importing react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import the required CSS for date picker
import ModalForm from "./ModalForm"; // Assuming the ModalForm component is created
import axios from "axios";

const initialEntry = {
  lotNumber: "",
  productType: "", // Added productType for Paddy or Rice selection
  riceType: "",
  variety: "",
  pack: "",
  mill: "",
  quantity: "",
};

export default function RiceProductionForm({ onSubmit }) {
  const [entries, setEntries] = useState([initialEntry]);
  const [startDate, setStartDate] = useState(undefined); // Add a separate state for start date
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [riceData, setRiceData] = useState({});
  const [paddyData, setPaddyData] = useState({});
  const token = localStorage.getItem("token"); // You can set this token dynamically or fetch it from a store/context

 // Fetch rice data
useEffect(() => {
    const fetchRiceData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rmproducts/riceproducts/details",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        );

        const transformedData = response.data.reduce((acc, item) => {
          const riceType = item.itemName; // Rice type as itemName
          const variety = item.varities; // Variety name

          if (!acc[riceType]) {
            acc[riceType] = { varieties: [] };
          }

          if (!acc[riceType].varieties.includes(variety)) {
            acc[riceType].varieties.push(variety);
          }

          return acc;
        }, {});

        setRiceData(transformedData);
      } catch (error) {
        console.error("Error fetching rice data:", error);
      }
    };

    fetchRiceData();
  }, [token]);

  // Fetch paddy data

   useEffect(() => {
    const fetchPaddyData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rmproducts/paddyproducts/details",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        );

        // Transform the paddy data to match the structure we need
        const transformedPaddyData = response.data.reduce((acc, item) => {
          const paddyType = item.itemName; // Paddy type as itemName
          const variety = item.varities; // Variety name

          if (!acc[paddyType]) {
            acc[paddyType] = { varieties: [] };
          }

          if (!acc[paddyType].varieties.includes(variety)) {
            acc[paddyType].varieties.push(variety);
          }

          return acc;
        }, {});

        setPaddyData(transformedPaddyData); // Update state with the fetched and transformed data
      } catch (error) {
        console.error("Error fetching paddy data:", error);
      }
    };

    fetchPaddyData();
  }, [token]);

  const addEntry = () => {
    setEntries([...entries, { ...initialEntry }]);
  };

  const removeEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleAddDetails = (data) => {
    const updatedEntries = [...entries];
    updatedEntries[currentIndex].additionalDetails.push(data);
    setEntries(updatedEntries);
  };

  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(entries, startDate); // Pass the startDate to the parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Start Date (Common for all entries) */}
        <div className="flex items-center space-x-2">
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700 w-[100px]"
          >
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)} // Set the date value
            dateFormat="yyyy/MM/dd" // Set the format to be more compact
            className="px-2 py-1 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Entries - Lot Number, Product Type (Paddy or Rice), Rice Type, Mill, Quantity in the same row */}
        <div className="overflow-y-auto max-h-[400px]">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="flex gap-2 p-2 bg-gray-50 rounded-lg items-end mb-2"
            >
              {/* Lot Number */}
              <div className="flex-1 min-w-[150px] space-y-1">
                <label
                  htmlFor={`lotNumber-${index}`}
                  className="text-xs font-medium text-gray-700"
                >
                  Lot Number
                </label>
                <input
                  id={`lotNumber-${index}`}
                  type="text"
                  value={entry.lotNumber}
                  onChange={(e) =>
                    updateEntry(index, "lotNumber", e.target.value)
                  }
                  placeholder="Enter lot number"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>

              {/* Product Type (Paddy or Rice) */}
              <div className="flex-1 min-w-[150px] space-y-1">
                <label
                  htmlFor={`productType-${index}`}
                  className="text-xs font-medium text-gray-700"
                >
                  Product Type
                </label>
                <select
                  id={`productType-${index}`}
                  value={entry.productType}
                  onChange={(e) =>
                    updateEntry(index, "productType", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="" disabled>
                    Select product type
                  </option>
                  <option value="rice">Rice</option>
                  <option value="paddy">Paddy</option>
                </select>
              </div>

              {/* Rice Type or Paddy */}
              {entry.productType && (
                <div className="flex-1 min-w-[150px] space-y-1">
                  <label
                    htmlFor={`riceType-${index}`}
                    className="text-xs font-medium text-gray-700"
                  >
                    {entry.productType === "rice" ? "Rice Type" : "Paddy"}
                  </label>
                  <select
                    id={`riceType-${index}`}
                    value={entry.riceType}
                    onChange={(e) =>
                      updateEntry(index, "riceType", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="" disabled>
                      Select{" "}
                      {entry.productType === "rice" ? "rice type" : "paddy"}
                    </option>
                    {entry.productType === "rice" &&
                      Object.keys(riceData).map((type, idx) => (
                        <option key={idx} value={type}>
                          {type}
                        </option>
                      ))}
                    {entry.productType === "paddy" &&
                      Object.keys(paddyData).map((type, idx) => (
                        <option key={idx} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Variety */}
              {entry.riceType && (
                <div className="flex-1 min-w-[150px] space-y-1">
                  <label
                    htmlFor={`variety-${index}`}
                    className="text-xs font-medium text-gray-700"
                  >
                    Variety
                  </label>
                  <select
                    id={`variety-${index}`}
                    value={entry.variety}
                    onChange={(e) =>
                      updateEntry(index, "variety", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="" disabled>
                      Select variety
                    </option>
                    {entry.productType === "rice" &&
                      riceData[entry.riceType]?.varieties.map(
                        (variety, idx) => (
                          <option key={idx} value={variety}>
                            {variety}
                          </option>
                        )
                      )}
                    {entry.productType === "paddy" &&
                      paddyData[entry.riceType]?.varieties.map(
                        (variety, idx) => (
                          <option key={idx} value={variety}>
                            {variety}
                          </option>
                        )
                      )}
                  </select>
                </div>
              )}

              {/* Mill */}
              <div className="flex-1 min-w-[150px] space-y-1">
                <label
                  htmlFor={`mill-${index}`}
                  className="text-xs font-medium text-gray-700"
                >
                  Mill
                </label>
                <select
                  id={`mill-${index}`}
                  value={entry.mill}
                  onChange={(e) => updateEntry(index, "mill", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="" disabled>
                    Select mill
                  </option>
                  <option value="mill-a">Sortex</option>
                  <option value="mill-b">Milling</option>
                </select>
              </div>

              {/* Add Details Button */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  Add Details
                </button>
              </div>

              {/* Quantity */}
              <div className="flex-1 min-w-[150px] space-y-1">
                <label
                  htmlFor={`quantity-${index}`}
                  className="text-xs font-medium text-gray-700"
                >
                  Quantity (kg)
                </label>
                <input
                  id={`quantity-${index}`}
                  type="number"
                  value={entry.quantity}
                  onChange={(e) =>
                    updateEntry(index, "quantity", e.target.value)
                  }
                  placeholder="Enter quantity"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>

              {/* Remove Entry Button (Cross) */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeEntry(index)} // Call the remove function on click
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Another Entry Button */}
        <button
          type="button"
          onClick={addEntry}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Another Entry
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-2">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>

      {/* Modal */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDetails}
      />
    </form>
  );
}
