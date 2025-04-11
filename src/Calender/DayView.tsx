import React from 'react';
import { useCalendar } from '../context/CalendarContext';

export function DayView() {
  const { selectedDate, events } = useCalendar();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.toDateString() === selectedDate.toDateString() &&
        event.time &&
        parseInt(event.time.split(':')[0]) === hour
      );
    });
  };

  return (
    <div className="bg-white rounded-b-lg overflow-y-auto max-h-[600px]">
      {hours.map(hour => {
        const hourEvents = getEventsForHour(hour);
        return (
          <div
            key={hour}
            className="flex border-b border-gray-200 min-h-[60px] relative group"
          >
            <div className="w-20 py-2 px-4 text-right text-sm text-gray-500">
              {hour.toString().padStart(2, '0')}:00
            </div>
            <div className="flex-1 p-2">
              {hourEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-blue-100 p-2 rounded mb-1 text-sm"
                >
                  <div className="font-semibold">{event.title}</div>
                  {event.description && (
                    <div className="text-xs text-gray-600">{event.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}