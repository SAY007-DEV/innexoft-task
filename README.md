# Innexoft Task - Full Stack Project

## Overview
This repository contains a full stack employee management and leave application system, built with a React front-end and a Node.js/Express/MongoDB back-end.

- **Front-End:** React, Vite, Zustand, Axios, React Router
- **Back-End:** Node.js, Express, MongoDB (Mongoose), bcryptjs

---

## Project Structure
```
innexoft-task/
├── front-end/   # React application (employee & HR dashboards)
├── back-end/    # Express API server (authentication, data persistence)
```

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/SAY007-DEV/innexoft-task
cd innexoft-task
```

### 2. Set Up the Back-End
See [`back-end/README.md`](back-end/README.md) for full details.

- Install dependencies:
  ```bash
  cd back-end
  npm install
  ```
- Create a `.env` file in `back-end/` with:
  ```env
  MONGO_DB=<your-mongodb-connection-string>
  ```
- Start the server (dev):
  ```bash
  npm run dev
  ```
  The server runs at [http://localhost:8000].

### 3. Set Up the Front-End
- Install dependencies:
  ```bash
  cd ../front-end
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
  The app runs at [http://localhost:5173] (default Vite port).

---

## Application Features

### Employee Portal
- **Login:** Employees can log in with email and password.
- **Dashboard:** View leave balance, apply for leave, see leave status (pending/approved/rejected).
- **State Management:** Uses Zustand and localStorage for client-side state.

### HR Portal
- **Dashboard:** View all employees, add new employees, manage leave requests (approve/reject).
- **Employee Management:** Add employees via a modal form.
- **Leave Management:** View, approve, or reject leave requests.

---

## Front-End Details
- **Tech Stack:** React 19, Vite, Zustand, Axios, React Router DOM
- **Main Files:**
  - `src/App.jsx`: Routing and main layout
  - `src/Components/`: Contains Home, Auth, HR and Employee dashboards
  - `src/Components/store.js`: Zustand store for state management
- **Scripts:**
  - `npm run dev` - Start dev server
  - `npm run build` - Build for production
  - `npm run preview` - Preview production build

---

## Back-End Details
- **Tech Stack:** Node.js, Express, MongoDB, Mongoose, bcryptjs
- **API Endpoints:** See [`back-end/README.md`](back-end/README.md) for full API documentation.
- **Scripts:**
  - `npm run dev` - Start dev server with nodemon
  - `npm start` - Start production server

---

## Environment Variables
- **Back-End:** Requires `.env` file with `MONGO_DB` connection string.
- **Front-End:** No environment variables required by default.

---

## Folder Structure (Summary)
```
innexoft-task/
├── front-end/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Components/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
├── back-end/
│   ├── Controller/
│   ├── Database/
│   ├── Routes/
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

---

