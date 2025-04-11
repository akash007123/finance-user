import { useCalendar } from '../context/CalendarContext';

export function MonthView() {
  const { selectedDate, events, setSelectedDate } = useCalendar();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(selectedDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getEventsForDate = (day: number) => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    return events.filter(event => new Date(event.date).toDateString() === date.toDateString());
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === selectedDate.getMonth() &&
      today.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="mt-6 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-7 text-xs sm:text-sm mb-2 sm:mb-4">
        {weekdays.map(day => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {Array(startingDay)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="h-20 sm:h-24" />
          ))}
        {days.map(day => {
          const dayEvents = getEventsForDate(day);
          return (
            <div
              key={day}
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(day);
                setSelectedDate(newDate);
              }}
              className={`h-20 sm:h-24 p-1 sm:p-2 rounded-lg relative cursor-pointer transition-colors
                ${isToday(day) ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}
            >
              <span
                className={`inline-block w-6 h-6 sm:w-8 sm:h-8 text-center text-xs sm:text-sm leading-6 sm:leading-8 rounded-full
                  ${isToday(day) ? 'bg-emerald-500 text-white' : ''}`}
              >
                {day}
              </span>
              {dayEvents.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className="text-[10px] sm:text-xs p-0.5 sm:p-1 bg-emerald-100 text-emerald-700 rounded truncate"
                    >
                      {event.time && `${event.time} - `}{event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[10px] sm:text-xs text-gray-500">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
