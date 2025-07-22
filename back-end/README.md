# Innexoft Task - Back-End

## Project Description
This is the back-end server for the Innexoft Task project. It is built with Node.js, Express, and MongoDB (via Mongoose). The server provides RESTful API endpoints for employee registration and login.

## Features
- Employee registration with hashed passwords
- Employee login with credential validation
- MongoDB integration for data persistence
- CORS enabled for cross-origin requests

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- bcryptjs (for password hashing)
- dotenv (for environment variables)
- nodemon (for development)

## Getting Started

### Prerequisites
- Node.js (v14 or above recommended)
- npm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SAY007-DEV/innexoft-task
   cd back-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `back-end` directory with the following content:
   ```env
   MONGO_DB=<your-mongodb-connection-string>
   ```
   Replace `<your-mongodb-connection-string>` with your actual MongoDB URI.

### Running the Server
- For development (with auto-reload):
  ```bash
  npm run dev
  ```
- For production:
  ```bash
  npm start
  ```

The server will start on [http://localhost:8000].


## Folder Structure
```
back-end/
├── Controller/
│   └── User.js
├── Database/
│   ├── Connect.js
│   └── UserSchema.js
├── Routes/
│   └── userRoute.js
├── server.js
├── package.json
├── .gitignore
└── ...
```


