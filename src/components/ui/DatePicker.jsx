import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DatePicker({ date, onDateChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined;
    onDateChange(newDate);
    setIsOpen(false); // Close the calendar after selecting the date
  };

  const handlePopoverClick = (e) => {
    e.stopPropagation(); // Prevent click propagation to modal
  };

  return (
    <div className="relative">
      <button
        onClick={togglePopover}
        className={`w-full justify-start text-left font-normal px-4 py-2 border border-gray-300 rounded-md ${!date ? 'text-gray-500' : 'text-black'}`}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-72 p-4 bg-white border border-gray-300 rounded-md shadow-md"
          onClick={handlePopoverClick} // Prevent modal close
        >
          <input
            type="date"
            value={date ? format(date, "yyyy-MM-dd") : ""}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}
