import { useState } from "react";
import { RiceProductionTable } from "./RiceProductionTable";
import RiceProductionForm from "./RiceProductionForm";

export default function RiceProdctionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (entries) => {
    console.log("Form submitted:", entries);
    setIsModalOpen(false);
    // Here you would typically send the data to your backend and update the table
  };

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rice Production Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Rice Production
        </button>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg w-full sm:w-[600px] lg:w-[90vw] p-6">
      <h2 className="text-xl font-semibold mb-4">Create Rice Production</h2>
      <RiceProductionForm onSubmit={handleFormSubmit} />
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      <RiceProductionTable />
    </main>
  );
}
