import { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';
import { DayView } from './DayView';
import { YearView } from './YearView';
import { EventForm } from './EventForm';


export function Calendar() {
  const { viewMode, events, setSelectedDate } = useCalendar();
  const [showEventForm, setShowEventForm] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === currentTime.toDateString();
    });
  };

  const formatDay = () => {
    return currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  };

  const formatDayNumber = () => {
    return currentTime.getDate().toString().padStart(2, '0');
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-emerald-500 text-white p-6 sm:p-8">
          <button className="mb-6 sm:mb-8">
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>

          <div className="mb-6 sm:mb-8 text-center lg:text-left">
            <div className="text-[72px] sm:text-[100px] lg:text-[120px] font-bold leading-none">
              {formatDayNumber()}
            </div>
            <div className="text-xl sm:text-2xl font-medium mb-1 sm:mb-2">{formatDay()}</div>
            <div className="text-base sm:text-xl font-medium text-emerald-100">{formatTime()}</div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg mb-3">Current Events</h3>
              {getCurrentEvents().length === 0 ? (
                <p className="text-sm text-emerald-100">No events for today</p>
              ) : (
                getCurrentEvents().map(event => (
                  <div
                    key={event.id}
                    className="bg-emerald-600 rounded-lg p-3 mb-2 cursor-pointer hover:bg-emerald-700 transition"
                    onClick={() => {
                      setEventToEdit(event); 
                      setShowEventForm(true);
                    }}
                  >
                    <div className="font-medium">{event.title}</div>
                    {event.time && (
                      <div className="text-sm text-emerald-100">{event.time}</div>
                    )}
                    {event.description && (
                      <div className="text-sm text-emerald-200 mt-1">{event.description}</div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setEventToEdit(null); 
                  setShowEventForm(true);
                }}
                className="flex items-center gap-2 text-emerald-500 bg-white w-full px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors justify-center"
              >
                <Plus className="w-5 h-5" />
                Create an Event
              </button>

              <button
                onClick={goToToday}
                className="flex items-center gap-2 bg-emerald-600 w-full px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors justify-center"
              >
                <CalendarIcon className="w-5 h-5" />
                Go to Today
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <CalendarHeader />
          <div className="mt-4 sm:mt-6">
            {viewMode === 'month' && <MonthView />}
            {viewMode === 'day' && <DayView />}
            {viewMode === 'year' && <YearView />}
          </div>
        </div>
      </div>

      {showEventForm && (
        <EventForm
          onClose={() => {
            setShowEventForm(false);
            setEventToEdit(null);
          }}
          eventToEdit={eventToEdit} 
        />
      )}
    </div>
  );
}
