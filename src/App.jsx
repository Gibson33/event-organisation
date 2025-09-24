import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./routes/NavBar";
import Login from "./components/Login"; // create this component
import "./App.css";

function Home() {
  return (
    <main className="main-content">
      <section className="event-list">
        <h2>Event List</h2>
        <p>No events yet...</p>
      </section>
      <section className="calendar">
        <h2>Calendar</h2>
        <p>Calendar will go here</p>
      </section>
    </main>
  );
}

function Products() {
  return (
    <div className="page-content">
      <h2>Products Page</h2>
    </div>
  );
}

function About() {
  return (
    <div className="page-content">
      <h2>About Page</h2>
    </div>
  );
}

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
