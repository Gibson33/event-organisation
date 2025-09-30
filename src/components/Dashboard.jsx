import React, { useState } from "react";
import Calendar from "react-calendar";
import { useEvents } from "../context/Events.context.jsx";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { events, deleteEvent } = useEvents();

  // Group events by date string
  const groupedEvents = events.reduce((acc, event) => {
    const key = new Date(event.date).toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  const eventsForSelected = groupedEvents[selectedDate.toDateString()] || [];

  return (
    <main className="dashboard-layout">
      {/* Calendar Section */}
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

      {/* Events for selected day */}
      <section className="selected-events-section">
        <h3>EVENTS ON {selectedDate.toLocaleDateString()}</h3>
        {eventsForSelected.length > 0 ? (
          <ul className="selected-events-list">
            {eventsForSelected.map((ev) => (
              <li key={ev.id} className="selected-event-item expanded">
                <div className="event-header">
                  <div className="event-info">
                    <span className="event-time">{ev.time}</span>
                    <span className="event-title">{ev.title}</span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteEvent(ev.id)}
                    title="Delete event"
                  >
                    ✕
                  </button>
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
