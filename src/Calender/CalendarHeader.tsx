import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "../context/CalendarContext";
import { ViewMode } from "../types/index";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function CalendarHeader() {
  const { selectedDate, setSelectedDate, viewMode } = useCalendar();

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (viewMode === "year") {
      newDate.setFullYear(
        newDate.getFullYear() + (direction === "next" ? 1 : -1)
      );
    } else if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4 sm:gap-8 text-gray-400">
        <div className="flex justify-end">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigateDate("prev")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <p className="text-gray-400 font-bold text-xl">
              {selectedDate.getFullYear()}
            </p>
            <button
              onClick={() => navigateDate("next")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:flex-wrap justify-center">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(index);
                  setSelectedDate(newDate);
                }}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedDate.getMonth() === index
                    ? "bg-emerald-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div><hr className="border-gray-500" style={{marginTop:"-20px"}} />
      </div>
    </>
  );
}
