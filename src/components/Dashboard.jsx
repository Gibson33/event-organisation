import React, { useState } from "react";
import Calendar from "react-calendar";
import { useEvents } from "../context/Events.context.jsx";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

/**
 * Dashboard Component
 * --------------------
 * This is the calender and event list view.
 * - Displays a calendar with event indicators for each day
 * - Shows a detailed list of events for the currently selected day
 * - Allows event deletion
 */
export default function Dashboard() {
  // Track the currently selected date in the calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Access global events and deleteEvent function from context
  const { events, deleteEvent } = useEvents();

  /**
   * Group events by their date string
   */
  const groupedEvents = events.reduce((acc, event) => {
    const key = new Date(event.date).toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  // Filter events for the selected calendar day
  const eventsForSelected = groupedEvents[selectedDate.toDateString()] || [];

  return (
    <main className="dashboard-layout">
      {/* Calendar Section */}
      <section className="calendar-section">
        <h3>CALENDAR</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          /**
           * tileContent: Custom rendering inside each calendar tile
           * - Displays up to 2 events as "pills"
           * - Shows "+X more" if there are more than 2
           */
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

      {/*  Events for Selected Day Section  */}
      <section className="selected-events-section">
        <h3>EVENTS ON {selectedDate.toLocaleDateString()}</h3>

        {eventsForSelected.length > 0 ? (
          <ul className="selected-events-list">
            {eventsForSelected.map((ev) => (
              <li key={ev.id} className="selected-event-item expanded">
                {/* Header: Time, Title, and Delete button */}
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

                {/* Expanded Details: Location & Description */}
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
