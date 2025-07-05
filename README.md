# HEALTH_CARE
Health care portal


# 🏥 Healthcare Portal - Hospital Management System

A full-stack healthcare portal designed to streamline hospital management processes. The system allows patients and healthcare providers to interact through a secure platform with features such as user authentication, appointment booking, dashboards, and access to public health information.

---

## 📌 Features

### 👥 User Roles
- **Patient**
  - Register/Login
  - View and update profile
  - Request appointments
  - View appointments on dashboard

- **Health Provider (Admin)**
  - Manage patient requests
  - Dashboard for appointments & analytics
  - Role-based access control

### 📄 Public Pages
- Health tips and news
- Contact and help information

---



## 🧩 Tech Stack

### Frontend
- **React.js**
- **Next.js**
- **Tailwind CSS**
- **Redux Toolkit** – For global state management (auth, appointments, etc.)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** – ODM for MongoDB

---

## 🛠️ Dependencies Used

### Frontend
- `react`
- `next`
- `tailwindcss`
- `@reduxjs/toolkit`
- `react-redux`
- `axios`

### Backend
- `express`
- `mongoose`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `bcryptjs`

---

## 🔐 Security & Authentication

- **JWT (JSON Web Tokens)** for user login sessions
- **bcryptjs** for secure password hashing
- **Role-Based Access Control (RBAC)** for managing patient vs admin permissions
- Sensitive credentials are stored in the `.env` file
- **Frontend-level validation & encryption** (client-side form validations and HTTPS)

---

## 🗃️ Database (MongoDB Atlas with Mongoose)

### ✅ Collections (Tables Equivalent)

#### `users`
- `name`, `email`, `password`, `role` (`patient` or `admin`)

#### `appointments`
- `patientId`, `doctorId`, `date`, `status`, `symptoms`

#### `health_articles` *(optional)*
- `title`, `content`, `createdAt`

> Schema enforcement via **Mongoose models**

---

## 🌐 API – RESTful Structure

**Base URL:** `/api`

### 🔐 Auth Routes
- `POST /api/auth/register` – Patient/Admin registration
- `POST /api/auth/registerDoctor` – if doctor save additional details
- `POST /api/auth/login` – Secure login (returns JWT)
- `GET /api/profile` – Get current user profile

### 📅 Appointment Routes (auth middleware for security)
- `POST /api/appointments` – Book appointment
- `GET /api/appointments` – View appointments (filtered by role)
- `PUT /api/appointments/:id` – Update status (admin only)

### 🌐 Public Routes 
- `GET /api/health-info` – Public health articles


---

## 🚀 Deployment

- **Frontend:** 

 Netlify
- **Backend API:**

 Heroku 

- **Database:** 

MongoDB Atlas (free tier for dev/testing)



## 🗂️ Project Structure
/HEALTH_CARE
   /client - nextjs
   /server - node(express)

