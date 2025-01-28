import { useState } from "react"
import { Download, Save, FileSpreadsheet } from "lucide-react"
import { exportToExcel } from "./exportToExcel"

export default function QCLabReport() {
  const [formData, setFormData] = useState({
    lotNo: "",
    dateOfQC: "",
    reportCreatedBy: "",
    QcreportNo: "",
    remarks: "",
  })

  const [measurements, setMeasurements] = useState([
    { parameter: "rejection - good grain %", value: "1", unit: "%" },
    { parameter: "Whitener 4 Broken %", value: "2", unit: "%" },
    { parameter: "Wand - length", value: "2", unit: "mm" },
    { parameter: "2nd wand", value: "45", unit: "mm" },
    { parameter: "Supreme", value: "3", unit: "mm" },
    { parameter: "Tibar", value: "5", unit: "mm" },
    { parameter: "Dubar", value: "56", unit: "mm" },
    { parameter: "Mini dubar", value: "6", unit: "mm" },
    { parameter: "Super mongra", value: "4", unit: "mm" },
    { parameter: "Mongra", value: "5", unit: "mm" },
    { parameter: "Nakku", value: "4", unit: "mm" },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMeasurementChange = (index, newValue) => {
    const updatedMeasurements = [...measurements]
    updatedMeasurements[index].value = newValue
    setMeasurements(updatedMeasurements)
  }

  const handleExport = () => {
    const data = [
      { ...formData },
      ...measurements.map((m) => ({ Parameter: m.parameter, Value: m.value, Unit: m.unit })),
    ]
    exportToExcel(data, "QC_Lab_Report")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#880000]/5 to-[#880000]/10 p-4">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-md overflow-hidden">
        <div className="bg-[#880000] text-white p-4 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <h2 className="text-2xl font-bold">QC Lab Report</h2>
            <FileSpreadsheet className="w-8 h-8 opacity-75" />
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Header Information */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-gray-50 p-2 rounded-md">
            <div className="space-y-1">
              <label htmlFor="QcreportNo" className="text-xs font-semibold text-gray-700">
                QC Report No
              </label>
              <input
                id="QcreportNo"
                name="QcreportNo"
                value={formData.QcreportNo}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lotNo" className="text-xs font-semibold text-gray-700">
                LOT No
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
            <div className="space-y-1">
              <label htmlFor="dateOfQC" className="text-xs font-semibold text-gray-700">
                Date of QC
              </label>
              <input
                id="dateOfQC"
                name="dateOfQC"
                type="date"
                value={formData.dateOfQC}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="reportCreatedBy" className="text-xs font-semibold text-gray-700">
                Report Created By
              </label>
              <input
                id="reportCreatedBy"
                name="reportCreatedBy"
                value={formData.reportCreatedBy}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
              />
            </div>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto rounded-md border border-gray-200 p-0">
            <table className="min-w-full table-auto">
              <thead className="bg-[#880000] text-white">
                <tr>
                  <th className="px-2 py-1 text-left text-xs font-semibold">Parameters</th>
                  <th className="px-2 py-1 text-left text-xs font-semibold">Values</th>
                  <th className="px-2 py-1 text-left text-xs font-semibold">Units</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-[#880000]/10`}>
                    <td className="text-gray-700 text-sm py-1 font-medium">{item.parameter}</td>
                    <td className="px-2 py-1">
                      <input
                      type="number"
                        value={item.value}
                        onChange={(e) => handleMeasurementChange(index, e.target.value)}
                        className="w-16 px-0 py-0 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
                      />
                    </td>
                    <td className="text-gray-600 text-sm py-1">{item.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
          
              <label htmlFor="reportCreatedBy" className="text-xs font-semibold text-gray-700">
               Remarks
              </label>
              <input
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="w-1/3 px-2 py-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#880000]"
              />
            

            <button
              className="flex items-center gap-2 px-3 py-1 border-2 border-[#880000] text-[#880000] hover:bg-[#880000] hover:text-white rounded-md transition duration-200 text-xs"
              onClick={handleExport}
            >
              <Download className="w-3 h-3" />
              Export
            </button>
            <button className="flex items-center gap-2 px-3 py-1 bg-[#880000] text-white hover:bg-[#880000]/90 rounded-md transition duration-200 text-xs">
              <Save className="w-3 h-3" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
