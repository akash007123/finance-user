import React, { useEffect, useState } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { X } from 'lucide-react';

interface EventData {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

interface EventFormProps {
  onClose: () => void;
  eventToEdit?: EventData;
}

export function EventForm({ onClose, eventToEdit }: EventFormProps) {
  const { selectedDate, addEvent, updateEvent, deleteEvent } = useCalendar();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  // 🔄 Populate form fields when editing
  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title || '');
      setDescription(eventToEdit.description || '');
      setTime(eventToEdit.time || '');
    } else {
      setTitle('');
      setDescription('');
      setTime('');
    }
  }, [eventToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(eventToEdit?.date || selectedDate);
    if (time) {
      const [hours, minutes] = time.split(':');
      date.setHours(parseInt(hours), parseInt(minutes));
    }

    const newEvent: EventData = {
      title,
      description,
      date: date.toISOString(),
      time,
    };

    if (eventToEdit?.id) {
      updateEvent({ ...newEvent, id: eventToEdit.id });
    } else {
      addEvent(newEvent);
    }

    onClose();
  };

  const handleDelete = () => {
    if (eventToEdit?.id) {
      deleteEvent(eventToEdit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {eventToEdit ? 'Edit Event' : 'Add Event'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input

              type="text"
              className="w-full p-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              className="w-full p-2 border rounded-md"
              value={time}
              required
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            {eventToEdit?.id && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-red-600 border border-red-500 hover:bg-red-50 rounded-md"
              >
                Delete
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {eventToEdit?.id ? 'Update' : 'Add'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
