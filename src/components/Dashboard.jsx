import React, { useState } from "react";
import Calendar from "react-calendar";
import { useEvents } from "../context/Events.context.jsx";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

/**
 * Dashboard Component
 * --------------------
 * - Displays a calendar with event indicators
 * - Lists events for the selected day
 * - Allows deleting and editing events
 */
export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { events, deleteEvent, updateEvent } = useEvents();

  // Track which event is currently being edited (by ID)
  const [editingEventId, setEditingEventId] = useState(null);

  // Temp form data for editing
  const [editFormData, setEditFormData] = useState({
    title: "",
    time: "",
    location: "",
    description: "",
  });

  /** Group events by date for calendar & list display */
  const groupedEvents = events.reduce((acc, event) => {
    const key = new Date(event.date).toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  const eventsForSelected = groupedEvents[selectedDate.toDateString()] || [];

  /** Start editing a specific event */
  const handleEdit = (ev) => {
    setEditingEventId(ev.id);
    setEditFormData({
      title: ev.title,
      time: ev.time,
      location: ev.location || "",
      description: ev.description || "",
    });
  };

  /** Save changes to an event */
  const handleSave = (id) => {
    updateEvent(id, editFormData);
    setEditingEventId(null);
  };

  /** Cancel editing */
  const handleCancel = () => {
    setEditingEventId(null);
  };

  /** Handle form field changes */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="dashboard-layout">
      {/*  Calendar Section  */}
      <section className="calendar-section">
        <h3>CALENDAR</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date }) => {
            const dayEvents = events.filter(
              (ev) => new Date(ev.date).toDateString() === date.toDateString()
            );
            if (dayEvents.length === 0) return null;

            return (
              <div className="calendar-day-events">
                {dayEvents.slice(0, 2).map((ev) => (
                  <div key={ev.id} className="calendar-event-pill">
                    <span className="event-time">{ev.time}</span>
                    <span className="event-title">{ev.title}</span>
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="more-events">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            );
          }}
        />
      </section>

      {/*  Event List Section  */}
      <section className="selected-events-section">
        <h3>EVENTS ON {selectedDate.toLocaleDateString()}</h3>

        {eventsForSelected.length > 0 ? (
          <ul className="selected-events-list">
            {eventsForSelected.map((ev) => (
              <li key={ev.id} className="selected-event-item expanded">
                {editingEventId === ev.id ? (
                  // Edit Mode
                  <div className="edit-form">
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleChange}
                      placeholder="Event title"
                    />
                    <input
                      type="time"
                      name="time"
                      value={editFormData.time}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleChange}
                      placeholder="Location"
                    />
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleChange}
                      placeholder="Description"
                    />
                    <div className="edit-actions">
                      <button
                        className="btn primary small"
                        onClick={() => handleSave(ev.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn secondary small"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="event-header">
                      <div className="event-info">
                        <span className="event-time">{ev.time}</span>
                        <span className="event-title">{ev.title}</span>
                      </div>
                      <div className="event-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(ev)}
                          title="Edit event"
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteEvent(ev.id)}
                          title="Delete event"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div className="event-details">
                      {ev.location && (
                        <p>
                          <strong>Location:</strong> {ev.location}
                        </p>
                      )}
                      {ev.description && (
                        <p>
                          <strong>Description:</strong> {ev.description}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events-msg">No events scheduled for this day.</p>
        )}
      </section>
    </main>
  );
}
