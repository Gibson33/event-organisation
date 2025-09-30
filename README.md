# 📝 Event Organisation App

A simple, responsive React web application for managing personal or team events — featuring authentication, local storage, and a clean UI built with MDB UI Kit.

Users can **sign up**, **log in**, and **manage events** on a personalized dashboard. This project is ideal as a foundation for more complex scheduling or calendar applications.

---

## 🌟 Features

- 🔐 **Authentication** (Sign Up / Log In / Log Out)

  - Users are stored in `localStorage`.
  - Passwords must include **8+ characters**, **1 number**, and **1 special character**.
  - Clear validation errors for login and signup flows.

- 🧍 **Persistent Sessions**

  - The current user is remembered between page refreshes using `localStorage`.

- 🗓️ **Event Management**

  - Create and delete events that are tied to the currently logged-in user.
  - Events are stored per-user in `localStorage`.

- 🧭 **Protected Routes**

  - Dashboard and Add Event pages are only accessible to logged-in users.
  - Unauthenticated users are redirected to the login page.

- 📱 **Responsive Design**

  - Clean layout built with **MDB React UI Kit**.
  - Responsive navigation bar and centered authentication pages with a modern blue gradient background.

- 🆘 **Help Page**
  - Provides usage instructions and a support contact link.

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Formik](https://formik.org/) – for form handling and validation
- [MDB React UI Kit](https://mdbootstrap.com/docs/react/) – for styling and layout
- LocalStorage – for user and event persistence

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/event-organisation-app.git
cd event-organisation-app
```

### 2. Install Dependencies

npm install

### 3. Run the App

npm run dev

## 🧭 Usage Guide

### 1. Sign Up for a new account on the Signup page.

- Use a valid email.
- Password must include at least 8 characters, one number, and one special character.

### 2. Log In with your credentials.

- Your session persists until you manually log out.

### 3. Go to the Dashboard to view events, or Add Event to create a new one.

- Events are stored per user in localStorage.

### 4. Visit the Help tab for instructions or contact information.

## 📁 Code Structure

src/
├─ assets/
│ └─ logo.webp
├─ components/
│ ├─ AddEvent.jsx
│ ├─ Dashboard.jsx
│ ├─ Help.jsx
│ ├─ Login.jsx
│ └─ SignUp.jsx
├─ context/
│ ├─ Auth.context.jsx
│ └─ Events.context.jsx
├─ routes/
│ └─ NavBar.jsx
├─ App.jsx
├─ App.css
├─ Login.css
└─ main.jsx
