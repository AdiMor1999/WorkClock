# ⏰ WorkClock 

> A full-stack web application for managing employee time tracking with separate user and admin interfaces.

## ✨ Features

### 🔐 Authentication
- Secure login with JWT token-based authentication
- Role-based access control (User/Admin)
- Protected routes and endpoints

### 👤 User Dashboard
- **Real-time Clock**: Display current German time
- **Time Tracking**: Easy clock-in/clock-out functionality

### 👑 Admin Dashboard
- **User Management**: View all users' time records
- **Report Editing**: Modify time entries as needed

### 💾 Data Management
- In-memory data storage
- Automatic persistence to JSON file
- State recovery on server restart

## 🛠 Tech Stack

- **Frontend**: React.js, React Router
- **Backend**: Node.js, Express
- **Authentication**: JWT
- **Storage**: In-memory + JSON file persistence

## 📥 Installation

### Prerequisites

### Clone Repository
```bash
git clone [repository-url]
cd WorkClock
```

### Server Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start server
npm start
```
Server runs on `http://localhost:5000`

### Client Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start application
npm start
```
Client runs on `http://localhost:3000`

## 🚀 Usage

### Login
- Access the application at `http://localhost:3000`
- Enter your credentials:
  ```
  Regular User:
  username: user1
  password: password123

  Admin User:
  username: admin
  password: password456
  ```
  
##🔄 Future Improvements
  -  **History**: Personal time tracking record
  - **Statistics**: Total hours worked
  - View analytics dashboard
  -Advanced filtering and search options
  -improve UI/UX
 
  
