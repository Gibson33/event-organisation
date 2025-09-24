import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function Dashboard() {
  return (
    <main className="main-content">
      <section className="event-list">
        <h2>Event List</h2>
      </section>
      <section className="calendar">
        <h2>Calendar</h2>
      </section>
    </main>
  );
}

function AddEvent() {
  return <h2 style={{ padding: "1rem" }}>Add Event Page (coming soon)</h2>;
}

function Help() {
  return <h2 style={{ padding: "1rem" }}>Help Page (coming soon)</h2>;
}

function App() {
  return (
    <div className="app-container">
      <Header />
      <div style={{ marginTop: "80px", flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
