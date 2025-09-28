import { createContext, useContext, useState, useEffect } from "react";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  // ✅ Load from localStorage initially and rehydrate Date objects
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("events");
    if (!stored) return [];
    return JSON.parse(stored).map((e) => ({
      ...e,
      date: new Date(e.date), // convert back to Date object
    }));
  });

  // ✅ Sync events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // ✅ Add new event
  const addEvent = (event) => {
    setEvents((prev) => [...prev, event]);
  };

  // ✅ Delete event by ID
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

// ✅ Hook to use Events anywhere in your app
export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
