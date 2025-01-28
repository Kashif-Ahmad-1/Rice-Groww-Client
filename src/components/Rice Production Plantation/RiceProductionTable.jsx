import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export function RiceProductionTable() {
  const [productions, setProductions] = useState([]);
  const [filteredProductions, setFilteredProductions] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null); // Track the expanded row's ID
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      try {
        const response = await axios.get("https://veer-rice-backend.onrender.com/api/riceproductions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProductions(response.data.data);
        setFilteredProductions(response.data.data); // Initially set the filtered data to all the productions
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle expanded row
  const handleRowClick = (rowId) => {
    // Toggle the expanded row by checking if the clicked row is the same as the currently expanded row
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  // Search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredProductions(productions); // Reset filter if search query is empty
    } else {
      const lowercasedQuery = e.target.value.toLowerCase();
      const filteredData = productions.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredProductions(filteredData);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto mt-0 p-2 bg-white rounded-lg shadow-lg">
      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <caption className="text-2xl font-semibold text-gray-700 mb-4">Rice Production Records</caption>
        <thead className="sticky top-0 bg-gray-100 z-10"> {/* Add sticky class and top-0 */}
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Start Date</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Lot Number</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Rice Type</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Mill</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Quantity (kg)</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Created By</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Created At</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row) => (
            <React.Fragment key={row._id}>
              {/* Main Table Row */}
              <tr
                onClick={() => handleRowClick(row._id)}
                className="cursor-pointer border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-sm text-gray-700">{new Date(row.startDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{row.lotNo}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{row.riceType || row.productType}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{row.mill}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{row.quantity}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{row.createdBy?.name || 'N/A'}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{new Date(row.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 text-sm text-blue-500">
                  {expandedRow === row._id ? (
                    <IoIosArrowUp className="text-xl cursor-pointer" />
                  ) : (
                    <IoIosArrowDown className="text-xl cursor-pointer" />
                  )}
                </td>
              </tr>
  
              {/* Expanded Row for Mixing Details */}
              {expandedRow === row._id && (
                <tr>
                  <td colSpan={8} className="px-4 py-4 bg-gray-50">
                    {row.mixing && row.mixing.length > 0 ? (
                      <div className="flex flex-wrap gap-4">
                        {row.mixing.map((mix, index) => (
                          <div key={index} className="flex-1 min-w-[calc(33.333%-1rem)] p-4 bg-gray-100 rounded-lg">
                            <div className="text-sm text-gray-600 font-semibold">{mix.productType}</div>
                            <div className="text-xs text-gray-500">Mixing Percentage: {mix.mixingPercentage}%</div>
                            <div className="text-xs text-gray-500">Bag Size: {mix.bagSize} kg</div>
                            <div className="text-xs text-gray-500">Mixing Quantity: {mix.mixingQuantity} kg</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">No mixing data available.</span>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
  
      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProductions.length)} of{' '}
          {filteredProductions.length} records
        </div>
        <div className="flex space-x-2">
          {[...Array(Math.ceil(filteredProductions.length / itemsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  
}
