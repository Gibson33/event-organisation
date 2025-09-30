import { createContext, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "./Auth.context.jsx";

const EventsContext = createContext(null);

/**
 * EventsProvider
 * --------------
 * A global context for managing user-specific events.
 * Features:
 * - Loads and saves events per logged-in user using localStorage
 * - Supports adding and deleting events
 * - Automatically persists changes when the user is logged in
 *
 * Events are stored under a key like: `events_user@example.com`
 * Each event object is enriched with `userEmail` so multiple accounts stay isolated.
 */
export function EventsProvider({ children }) {
  const { state } = useContext(AuthContext);
  const currentUser = state?.currentUser;

  const [events, setEvents] = useState([]);
  const hasLoaded = useRef(false);

  // Load events for the current user on login
  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`events_${currentUser.email}`);
      if (stored) {
        const parsed = JSON.parse(stored).map((ev) => ({
          ...ev,
          date: new Date(ev.date), // convert string back to Date object
        }));
        setEvents(parsed);
      } else {
        setEvents([]);
      }
      hasLoaded.current = true;
    } else {
      // If no user is logged in, clear events state
      setEvents([]);
      hasLoaded.current = false;
    }
  }, [currentUser]);

  // Persist events to localStorage whenever they change
  useEffect(() => {
    if (currentUser && hasLoaded.current) {
      localStorage.setItem(
        `events_${currentUser.email}`,
        JSON.stringify(events)
      );
    }
  }, [events, currentUser]);

  //  Add a new event
  const addEvent = (event) => {
    if (!currentUser) return;
    setEvents((prev) => [...prev, { ...event, userEmail: currentUser.email }]);
  };

  //  Delete an event by ID
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

/**
 * useEvents
 * ---------
 * Convenience hook for accessing the EventsContext.
 */
export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
