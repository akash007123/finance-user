import React, { createContext, useContext, useState, useEffect } from 'react';
import { CalendarContextType, CalendarEvent, ViewMode } from '../types';

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...eventData,
      id: crypto.randomUUID(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };
  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };
  

  return (
    <CalendarContext.Provider
      value={{
        events,
        addEvent,
        deleteEvent,
        selectedDate,
        setSelectedDate,
        updateEvent,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}





export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}