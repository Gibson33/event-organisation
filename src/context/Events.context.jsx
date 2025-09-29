import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./Auth.context.jsx";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const { state } = useContext(AuthContext);
  const currentUserEmail = state.currentUser?.email;

  const [events, setEvents] = useState([]);

  // ✅ Load events for the current user on login
  useEffect(() => {
    if (currentUserEmail) {
      const stored = JSON.parse(localStorage.getItem("events") || "{}");
      setEvents(stored[currentUserEmail] || []);
    } else {
      setEvents([]); // user logged out
    }
  }, [currentUserEmail]);

  // ✅ Sync only current user's events to localStorage when they change
  useEffect(() => {
    if (currentUserEmail) {
      const allEvents = JSON.parse(localStorage.getItem("events") || "{}");
      allEvents[currentUserEmail] = events;
      localStorage.setItem("events", JSON.stringify(allEvents));
    }
  }, [events, currentUserEmail]);

  const addEvent = (event) => {
    setEvents((prev) => [...prev, event]);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
