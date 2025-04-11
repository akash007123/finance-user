import { useCalendar } from '../context/CalendarContext';

export function YearView() {
  const { selectedDate, setSelectedDate, events } = useCalendar();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventsForMonth = (month: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === month
      );
    });
  };

  const isCurrentMonth = (month: number) => {
    const today = new Date();
    return (
      today.getMonth() === month &&
      today.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-b-lg">
      {months.map((month, index) => {
        const monthEvents = getEventsForMonth(index);
        return (
          <div
            key={month}
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(index);
              setSelectedDate(newDate);
            }}
            className={`p-4 rounded-lg cursor-pointer ${
              isCurrentMonth(index)
                ? 'bg-blue-50 border-blue-200'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <h3 className="font-semibold mb-2">{month}</h3>
            <div className="text-sm text-gray-600">
              {monthEvents.length} events
            </div>
          </div>
        );
      })}
    </div>
  );
}