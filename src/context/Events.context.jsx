import { createContext, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "./Auth.context.jsx";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const { state } = useContext(AuthContext);
  const currentUser = state?.currentUser;

  const [events, setEvents] = useState([]);
  const hasLoaded = useRef(false); // ✅ track if initial load has happened

  // ✅ Load events for current user from localStorage on login
  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`events_${currentUser.email}`);
      if (stored) {
        const parsed = JSON.parse(stored).map((ev) => ({
          ...ev,
          date: new Date(ev.date),
        }));
        setEvents(parsed);
      } else {
        setEvents([]);
      }
      hasLoaded.current = true; // ✅ mark as loaded
    } else {
      setEvents([]);
      hasLoaded.current = false;
    }
  }, [currentUser]);

  // ✅ Save events for the current user only after initial load
  useEffect(() => {
    if (currentUser && hasLoaded.current) {
      localStorage.setItem(
        `events_${currentUser.email}`,
        JSON.stringify(events)
      );
    }
  }, [events, currentUser]);

  const addEvent = (event) => {
    if (!currentUser) return;
    setEvents((prev) => [...prev, { ...event, userEmail: currentUser.email }]);
  };

  const deleteEvent = (id) => {
    if (!currentUser) return;
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
