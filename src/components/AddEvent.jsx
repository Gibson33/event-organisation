import React, { useState } from "react";
import { useEvents } from "../context/Events.context.jsx";
import "./AddEvent.css";

export default function AddEvent() {
  const { addEvent } = useEvents();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventData.title || !eventData.date || !eventData.time) {
      alert("Please fill in the Title, Date, and Time fields.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      date: new Date(`${eventData.date}T${eventData.time}`),
      time: eventData.time,
      description: eventData.description,
    };

    addEvent(newEvent);
    setEventData({ title: "", date: "", time: "", description: "" });

    // ✅ Show toast for 3 seconds
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    setEventData({ title: "", date: "", time: "", description: "" });
  };

  return (
    <div className="add-event-container">
      <h2>Add New Event</h2>

      <form onSubmit={handleSubmit} className="add-event-form">
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

        <div className="form-actions">
          <button type="submit" className="btn primary">
            Add Event
          </button>
          <button type="button" onClick={handleReset} className="btn secondary">
            Reset
          </button>
        </div>
      </form>

      {/* ✅ Toast Popup */}
      {showToast && (
        <div className="toast-popup">✅ Event added successfully!</div>
      )}
    </div>
  );
}
