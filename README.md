# Project: Food Delivery System

## Overview
This project is a full-stack food delivery system consisting of three main components:
- **Admin Panel** (`admin`)
- **Frontend** (`frontend`)
- **Backend** (`backend`)

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js, MongoDB/MySQL
- **Admin Panel**: React.js 
- **Other**: REST APIs, JWT Authentication 

## Setup Instructions

### 1. Backend Setup
Navigate to the `backend` directory and install dependencies:

cd backend
npm install

Start the backend server:

npm start

Make sure to configure the database connection in the .env file.

### 2. Frontend Setup
Navigate to the `frontend` directory and install dependencies:

cd frontend
npm install

Start the frontend application:

npm start


### 3. Admin Panel Setup
Navigate to the admin directory and install dependencies:

cd admin
npm install

Start the admin panel:

npm start


## Features
- **Users**: Browse restaurants, order food, track orders.
- **Admin Panel**: Manage restaurants, menu items, and orders.
- **Authentication**: User login/signup (if implemented).
- **Database**: Store user, order, and restaurant details.

## API Endpoints (Backend)
- POST /api/auth/register` - Register a new user
- POST /api/auth/login` - Login user
- GET /api/restaurants` - Get all restaurants
- POST /api/orders` - Place an order



