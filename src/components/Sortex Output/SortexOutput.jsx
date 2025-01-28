import { useState } from "react"
import { FileText, Save, Printer } from "lucide-react"
import { generatePDF } from "./pdfExport"

export default function SortexOutput() {
  const [formData, setFormData] = useState({
    itemName: "Rice",
    sortexNo: "Sortex 4",
    lotNo: "Lot 1002",
    quantity: "60000",
  })

  const [parameters, setParameters] = useState([
    { name: "Rejection", value: "23" },
    { name: "Rejection broken", value: "4" },
    { name: "Sizer", value: "3" },
    { name: "Sizer Broken", value: "5" },
    { name: "Wand", value: "6" },
    { name: "2nd wand", value: "6" },
    { name: "Supreme", value: "4" },
    { name: "Tibar", value: "6" },
    { name: "Dubar", value: "4" },
    { name: "Mini dubar", value: "6" },
    { name: "Super mongra", value: "4" },
    { name: "Mongra", value: "6" },
    { name: "Nakku", value: "4" },
  ])

  const [directPacking, setDirectPacking] = useState([
    { name: "dishad 25kg", value: "3" },
    { name: "dishad pp 45 kg", value: "1" },
  ])

  const totalOutput = parameters.reduce((sum, item) => sum + Number.parseInt(item.value), 0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleParameterChange = (index, e) => {
    const updatedParameters = [...parameters]
    updatedParameters[index].value = e.target.value
    setParameters(updatedParameters)
  }

  const handleDirectPackingChange = (index, e) => {
    const updatedDirectPacking = [...directPacking]
    updatedDirectPacking[index].value = e.target.value
    setDirectPacking(updatedDirectPacking)
  }

  const handleExportPDF = () => {
    generatePDF({ formData, parameters, directPacking, totalOutput })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#880000]/5 to-[#880000]/10 p-4">
      <div className="w-full max-w-7xl mx-auto shadow-2xl border-t-4 border-t-[#880000] overflow-hidden rounded-md bg-white">
        <div className="bg-[#880000] text-white p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <h2 className="text-2xl font-bold">Sortex Output</h2>
            <Printer className="w-8 h-8 opacity-75" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Header Information */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-md">
            <div className="space-y-1">
              <label htmlFor="itemName" className="text-xs font-semibold text-gray-700">
                Input Item Name
              </label>
              <input
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="quantity" className="text-xs font-semibold text-gray-700">
                Rice Input
              </label>
              <input
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="sortexNo" className="text-xs font-semibold text-gray-700">
                Sortex No
              </label>
              <input
                id="sortexNo"
                name="sortexNo"
                value={formData.sortexNo}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lotNo" className="text-xs font-semibold text-gray-700">
                Sortex Lot No
              </label>
              <select
                id="lotNo"
                name="lotNo"
                value={formData.lotNo}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
              >
                <option value="" disabled>Select a LOT No</option>
                <option value="Lot 001">Lot 001</option>
                <option value="Lot 002">Lot 002</option>
                <option value="Lot 003">Lot 003</option>
                <option value="Lot 004">Lot 004</option>
                <option value="Lot 005">Lot 005</option>
                </select>
            </div>
          </div>

          {/* Parameters Table */}
          <div className="overflow-x-auto rounded-md border border-gray-200 p-0">
            <table className="min-w-full table-auto">
              <thead className="bg-[#880000] text-white">
                <tr>
                  <th className="px-2 py-1 text-left text-xs font-semibold">Parameters</th>
                  <th className="px-2 py-1 text-left text-xs font-semibold">Qty Mt.</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-[#880000]/5 transition-colors duration-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="text-gray-700 text-sm py-1 font-medium">{item.name}</td>
                    <td className="px-2 py-1">
                      <input
                        value={item.value}
                        onChange={(e) => handleParameterChange(index, e)}
                        className="w-16 px-0 py-0 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Output */}
          <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
            <span className="font-bold text-[#880000] text-sm">Total Output Sortex</span>
            <span className="font-bold text-[#880000] text-lg">{totalOutput}</span>
          </div>

          {/* Direct Packing Table */}
          <div className="bg-gray-50 p-2 rounded-md">
            <div className="font-semibold text-sm mb-2">Direct Packing after sortex 4</div>
            <div className="space-y-2">
              {directPacking.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <input
                  type="number"
                    value={item.value}
                    onChange={(e) => handleDirectPackingChange(index, e)}
                    className="max-w-[80px] px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              className="flex items-center gap-1 px-3 py-2 border-2 border-[#880000] text-[#880000] hover:bg-[#880000] hover:text-white rounded-md transition duration-200 text-xs"
              onClick={handleExportPDF}
            >
              <FileText className="w-3 h-3" />
              Export PDF
            </button>
            <button className="flex items-center gap-1 px-3 py-2 bg-[#880000] hover:bg-[#880000]/90 text-white rounded-md transition duration-200 text-xs">
              <Save className="w-3 h-3" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
