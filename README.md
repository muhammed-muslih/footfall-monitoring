# Mini Footfall Monitoring System

## 📋 Overview

This project is a Mini Footfall Monitoring System built using the MERN stack (MongoDB, Express.js, React, Node.js). It collects footfall data from sensors, displays real-time analytics, and visualizes sensor locations on a map.

---

## Features

- Real-time footfall data monitoring per sensor
- Aggregated hourly and daily analytics
- Interactive map showing sensor locations and statuses
- REST API backend with MongoDB database
- Dockerized setup for easy deployment

---

## Key Assumptions

- Sensor Simulation: The system assumes sensors send data exactly once per hour with fields: sensor_id, timestamp, and count.
- Device Status Logic: Devices are considered active if data was received in the past 1 hours, otherwise inactive.
- Backend aggregates data and stores it in MongoDB.
- Frontend polls API periodically (Socket.IO not used).
- Frontend consumes backend API to display dashboards and maps.
- Sensor Locations: GPS coordinates for sensors are mocked/static, not dynamically sourced.
- Database: MongoDB is used in standalone mode; no sharding or replication setup is required for the scope of this task.

---

## High-Level Design Decisions

### Architecture: MERN Stack

- **MongoDB** Atlas for storing footfall sensor data
- **Express.js API** to serve RESTful endpoints
- **React.js** frontend with dashboard, charts, maps, and status cards
- **Leaflet.js** for interactive map view
- **Docker** and **docker-compose** for containerization and local orchestration

### Frontend Feature

- Real-Time Chart: Shows footfall counts over the past 1 hour, refreshed on sensor change or interval.
- Daily Summary: Displays today's total footfall for each sensor.
- Device Status Cards: Shows last seen time, device ID, and active/inactive status with color indication.
- Map View: Built with Leaflet, showing hardcoded sensor locations on a map with dynamic popup details.
    

### Sensor Simulation
      
- Node.js script (simulator.js) runs a loop to post fake data to the API every simulated hour.
- Helpful for testing both real-time charts and active/inactive status detection.

### Dockerized Environment
      
- Both frontend and backend are containerized with minimal Dockerfiles.
- docker-compose.yml orchestrates frontend, backend, and optionally MongoDB.

---

## 🔧 Setup Instructions

Before running the project, make sure you configure the necessary environment variables.

---

## 🛠️ Installation & Running the Project

This project can be run either with Docker (recommended for consistency) or manually using Node.js and npm.

---

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## Environment Setup

### Backend `.env` File

Create a file named `.env` inside the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>.mongodb.net/footfall_db

-Note: Replace <username>, <password>, and <cluster-url> with your actual MongoDB Atlas credentials.

---


### Option 1: Run with Docker

- Ensure your .env file is correctly set in backend/
- From the project root, run: docker compose up --build
- Access the services:
     - Frontend: http://localhost:5173
     - Backend API: http://localhost:3000

### Option 2: Run Locally Without Docker
- Backend
    - cd backend
    - npm install
    - npm start
    - Backend will run on: http://localhost:3000
- Frontend
    - cd frontend
    - npm install
    - npm run dev
    - Frontend will run on: http://localhost:5173    