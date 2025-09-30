import React, { useState } from "react";
import { useEvents } from "../context/Events.context.jsx";
import "./AddEvent.css";

/**
 * AddEvent Component
 * -------------------
 * This component provides a form for users to add new events.
 * Events are stored globally via the Events context.
 * Includes fields for title, date, time, location, and description,
 * with basic validation and a toast popup on success.
 */
export default function AddEvent() {
  const { addEvent } = useEvents();

  // Local state to manage form inputs
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
  });

  // Toast popup state
  const [showToast, setShowToast] = useState(false);

  /**
   * Handle changes in form inputs
   * Uses computed property names to update the correct field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission
   * - Validates required fields
   * - Constructs a new event object
   * - Adds it to the global event store via context
   * - Resets form and shows success toast
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventData.title || !eventData.date || !eventData.time) {
      alert("Please fill in the Title, Date, and Time fields.");
      return;
    }

    const newEvent = {
      id: Date.now(), // simple unique ID
      title: eventData.title,
      date: new Date(`${eventData.date}T${eventData.time}`),
      time: eventData.time,
      description: eventData.description,
      location: eventData.location,
    };

    addEvent(newEvent);

    // Reset form fields after successful submission
    setEventData({
      title: "",
      date: "",
      time: "",
      description: "",
      location: "",
    });

    // ✅ Show toast for 3 seconds
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  /**
   * Reset form without submitting
   */
  const handleReset = () => {
    setEventData({
      title: "",
      date: "",
      time: "",
      description: "",
      location: "",
    });
  };

  return (
    <div className="add-event-container">
      <h2>Add New Event</h2>

      {/* === Event Form === */}
      <form onSubmit={handleSubmit} className="add-event-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Event Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="e.g. Team Lunch"
          />
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
        </div>

        {/* Time */}
        <div className="form-group">
          <label htmlFor="time">Time *</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            placeholder="e.g. Conference Room B"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Optional details..."
          />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn primary">
            Add Event
          </button>
          <button type="button" onClick={handleReset} className="btn secondary">
            Reset
          </button>
        </div>
      </form>

      {/* Toast Popup */}
      {showToast && (
        <div className="toast-popup">
          Event added successfully!
          {eventData.location && (
            <div className="toast-location">📍 {eventData.location}</div>
          )}
        </div>
      )}
    </div>
  );
}
