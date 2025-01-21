import React, { useState } from "react"

const lotOptions = [
  { value: "LT1001", label: "LT1001" },
  { value: "LT1002", label: "LT1002" },
  { value: "LT1003", label: "LT1003" },
]

const initialRows = [
  { id: 1, parameter: "Rejection Yellow (पीला)", bagsType: "PP", bagsPP: "100", qty: "100", qtyMt: 4.5 },
  { id: 2, parameter: "Rejection Yellow (पीला)", bagsType: "Jute", bagsPP: "200", qty: "200", qtyMt: 11 },
  { id: 3, parameter: "Rejection black (काला)", bagsType: "Same as above", bagsPP: "", qty: "", qtyMt: 7 },
  { id: 4, parameter: "Rejection broken (टूटा हुआ )", bagsType: "", bagsPP: "", qty: "", qtyMt: 8.5 },
  { id: 5, parameter: "Sizer (साइज़र )", bagsType: "", bagsPP: "", qty: "", qtyMt: 3 },
  { id: 6, parameter: "Sizer Broken (साइज़र टूटा हुआ)", bagsType: "", bagsPP: "", qty: "", qtyMt: 5 },
]

export default function MillingPlantOutput() {
  const [selectedLot, setSelectedLot] = useState("LT1001")
  const [rows, setRows] = useState(initialRows)

  // Calculate quantity in Metric Tons (MT)
  const calculateQtyMt = (qty, bagsPP, bagsType) => {
    const numQty = Number.parseFloat(qty) || 0
    const numBagsPP = Number.parseFloat(bagsPP) || 0
    const weight = bagsType.toLowerCase() === "pp" ? 45 : bagsType.toLowerCase() === "jute" ? 55 : 0
    return (numQty * numBagsPP * weight) / 1000
  }

  // Handle input changes
  const handleInputChange = (id, field, value) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          const updatedRow = { ...row, [field]: value }

          // Recalculate qtyMt if qty, bagsPP, or bagsType changes
          if (field === "qty" || field === "bagsPP" || field === "bagsType") {
            updatedRow.qtyMt = calculateQtyMt(updatedRow.qty, updatedRow.bagsPP, updatedRow.bagsType)
          }

          return updatedRow
        }
        return row
      })
    )
  }

  // Calculate total qtyMt for all rows
  const totalQtyMt = rows.reduce((sum, row) => sum + row.qtyMt, 0)

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-zinc-100 p-4 border-b">
          <h2 className="text-xl font-bold">Milling Plant Back Output</h2>
        </div>
        <div className="p-6">
          {/* Header Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-4">
              <span className="font-medium">Output Date -</span>
              <span>10/01/2025</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">Select Lot No</span>
              <select
                value={selectedLot}
                onChange={(e) => setSelectedLot(e.target.value)}
                className="border rounded-md p-2"
              >
                {lotOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#B7D5A5]">
                  <th className="border p-2 font-bold">Parameters</th>
                  <th className="border p-2 font-bold">Bags Type</th>
                  <th className="border p-2 font-bold">
                    Bags PP 45/
                    <br />
                    Jute Bags
                    <br />
                    55 kg
                  </th>
                  <th className="border p-2 font-bold">Qty</th>
                  <th className="border p-2 font-bold">Qty Mt</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="border p-2">{row.parameter}</td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.bagsType}
                        onChange={(e) => handleInputChange(row.id, "bagsType", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.bagsPP}
                        onChange={(e) => handleInputChange(row.id, "bagsPP", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={row.qty}
                        onChange={(e) => handleInputChange(row.id, "qty", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="border p-2">{row.qtyMt.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Output */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <span className="text-lg font-bold text-red-600">Total Output</span>
            <span className="text-lg font-bold text-red-600">{totalQtyMt.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
