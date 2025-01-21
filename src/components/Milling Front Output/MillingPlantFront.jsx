import React, { useState } from "react"

// Sample product data
const productData = {
  "DILSHAD Super Tibar": {
    varieties: ["White Sella", "Golden Sella", "Raw"],
    packSizes: ["10Kg", "25Kg", "50Kg"],
  },
  "DILSHAD XXXL": {
    varieties: ["Premium", "Standard", "Regular"],
    packSizes: ["10Kg", "25Kg", "30Kg"],
  },
}

const lotNumbers = ["LT1001", "LT1002", "LT1003", "LT1004"]

export default function MillingPlantFront() {
  const [selectedLot, setSelectedLot] = useState("LT1001")
  const [rows, setRows] = useState([
    {
      id: 1,
      product: "DILSHAD Super Tibar",
      variety: "White Sella",
      packSize: "10Kg",
      bags: "560",
      weightMt: "5.6",
    },
  ])

  const calculateWeight = (bags, packSize) => {
    const quantity = Number.parseFloat(bags) || 0
    const size = Number.parseFloat(packSize.replace("Kg", "")) || 0
    return ((quantity * size) / 1000).toFixed(1)
  }

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        product: "",
        variety: "",
        packSize: "",
        bags: "",
        weightMt: "0.0",
      },
    ])
  }

  const handleRowChange = (id, field, value) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row, [field]: value }
          // Reset dependent fields when product changes
          if (field === "product") {
            updatedRow.variety = ""
            updatedRow.packSize = ""
          }
          // Calculate weight when bags or packSize changes
          if (field === "bags" || field === "packSize") {
            updatedRow.weightMt = calculateWeight(updatedRow.bags, updatedRow.packSize)
          }
          return updatedRow
        }
        return row
      }),
    )
  }

  const totalBags = rows.reduce((sum, row) => sum + (Number.parseInt(row.bags) || 0), 0)
  const totalWeight = rows.reduce((sum, row) => sum + (Number.parseFloat(row.weightMt) || 0), 0)

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-zinc-100 p-4 border-b">
          <h1 className="text-xl font-bold">Milling Plant Front OutPut / Packing Report</h1>
        </div>

        <div className="p-6">
          {/* Header Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-medium">FG Packing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Date:</span>
              <span>10/01/2025</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Lot No:</span>
              <select
                value={selectedLot}
                onChange={(e) => setSelectedLot(e.target.value)}
                className="border rounded-md p-2 min-w-[150px] bg-white"
              >
                {lotNumbers.map((lot) => (
                  <option key={lot} value={lot}>
                    {lot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-[#B7D5A5]">
                  <th className="border p-3 text-left font-semibold">Product name</th>
                  <th className="border p-3 text-left font-semibold">Variety</th>
                  <th className="border p-3 text-left font-semibold">Pack Size</th>
                  <th className="border p-3 text-left font-semibold">No of Bags ( Qty)</th>
                  <th className="border p-3 text-left font-semibold">Weight mt</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border p-3">
                      <select
                        value={row.product}
                        onChange={(e) => handleRowChange(row.id, "product", e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Product</option>
                        {Object.keys(productData).map((product) => (
                          <option key={product} value={product}>
                            {product}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-3">
                      <select
                        value={row.variety}
                        onChange={(e) => handleRowChange(row.id, "variety", e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={!row.product}
                      >
                        <option value="">Select Variety</option>
                        {row.product &&
                          productData[row.product].varieties.map((variety) => (
                            <option key={variety} value={variety}>
                              {variety}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="border p-3">
                      <select
                        value={row.packSize}
                        onChange={(e) => handleRowChange(row.id, "packSize", e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={!row.product}
                      >
                        <option value="">Select Size</option>
                        {row.product &&
                          productData[row.product].packSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="border p-3">
                      <input
                        type="number"
                        value={row.bags}
                        onChange={(e) => handleRowChange(row.id, "bags", e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter quantity"
                      />
                    </td>
                    <td className="border p-3 font-medium">{row.weightMt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Row Button */}
          <button
            onClick={handleAddRow}
            className="mt-4 px-6 py-2 bg-[#B7D5A5] text-black rounded-lg hover:bg-[#9BC185] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Add Row
          </button>

          {/* Total Section */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <span className="text-lg font-bold text-red-600">Total Front Output</span>
            <div className="flex gap-8">
              <span className="text-lg font-bold">{totalBags}</span>
              <span className="text-lg font-bold text-red-600">{totalWeight.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

