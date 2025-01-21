const dummyData = [
    { id: 1, startDate: "2023-05-01", lotNumber: "LOT001", riceType: "Basmati", mill: "Mill A", quantity: 1000 },
    { id: 2, startDate: "2023-05-03", lotNumber: "LOT002", riceType: "Jasmine", mill: "Mill B", quantity: 1500 },
    { id: 3, startDate: "2023-05-05", lotNumber: "LOT003", riceType: "Long Grain", mill: "Mill C", quantity: 2000 },
    { id: 4, startDate: "2023-05-07", lotNumber: "LOT004", riceType: "Short Grain", mill: "Mill A", quantity: 1200 },
    { id: 5, startDate: "2023-05-09", lotNumber: "LOT005", riceType: "Basmati", mill: "Mill B", quantity: 1800 },
  ];
  
  export function RiceProductionTable() {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <caption className="text-xl font-semibold text-gray-700 p-4">Rice Production Records</caption>
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left font-medium text-gray-600">Start Date</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Lot Number</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Rice Type</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Mill</th>
              <th className="px-4 py-2 text-right font-medium text-gray-600">Quantity (kg)</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((row) => (
              <tr key={row.id} className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-700">{row.startDate}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{row.lotNumber}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{row.riceType}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{row.mill}</td>
                <td className="px-4 py-2 text-sm text-right text-gray-700">{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  