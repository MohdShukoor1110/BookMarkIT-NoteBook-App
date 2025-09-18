# 📝 BookMarkIT App Full-Stack Project (A notebook application)

This is a comprehensive full-stack project for a Note Application. It is composed of two main parts: a backend API built with Node.js and a frontend client built with React. The application allows users to create, read, update, and delete notes, with API rate-limiting to prevent excessive requests.

## ⚙️ Technologies Used

**Backend (Node.js)**
- **Node.js:** The JavaScript runtime environment.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose:** An elegant MongoDB object modeling tool.
- **Upstash/Redis:** Used for the rate-limiting functionality.
- **dotenv:** For managing environment variables.
**Frontend (React)**
- **React:** A JavaScript library for building the user interface.
- **React Router:** For handling client-side routing.
- **Axios:** A promise-based HTTP client for API requests.
- **Bootstrap 5:** For responsive styling and layout.
- **Lucide-React:** For a modern icon set.
- **React Hot Toast:** For user-friendly notifications.

## ✨Features

- **CRUD Operations:** Full functionality to Create, Read, Update, and Delete notes.
- **MongoDB Database:** Uses Mongoose for easy interaction with a MongoDB database.
- **Rate Limiting:** Implements a rate limiter to protect the API from excessive requests.
- **CORS:** Configured to accept requests from a specific frontend origin (http://localhost:3000).

## 🚀 Installation & Setup

### **Backend Setup**
**1. Navigate to the backend directory and install dependencies:**
```bash
  cd backend
  npm install
```
**2. Create a .env file in the root directory and add the following environment variables:**
```text
PORT=4001
MONGO_URI=<your_mongodb_connection_string>
UPSTASH_REDIS_REST_URL=<your_upstash_redis_rest_url>
UPSTASH_REDIS_REST_TOKEN=<your_upstash_redis_rest_token>
```
**3. Start the backend server:**
```bash
  npm run dev
```

### **Frontend Setup**
**1. Navigate to the frontend directory and install dependencies:**
```bash
  cd frontend
  npm install
```
**2. Start the frontend application:**
```bash
  npm run dev
```
The application will open in your browser, typically at http://localhost:3000.

## 📖 API Endpoints
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notes` | Get all notes. | - |
| `GET` | `/api/notes/:id` | Get a note by its ID. | - |
| `POST` | `/api/notes` | Create a new note. | `{ "title": "...", "content": "..." }` |
| `PUT` | `/api/notes/:id` | Update a note by its ID. | `{ "title": "...", "content": "..." }` |
| `DELETE` | `/api/notes/:id` | Delete a note by its ID. | - |

## 🗺️ Application Routes
**The frontend provides the following routes for navigation:**
| Path |  Description |
| :--- | :--- |
| `/` | The homepage, which displays all notes. |
| `/create` | A page with a form to create a new note. |
| `/note/:id` | A page to view, edit, or delete a specific note. |
