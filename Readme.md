# EduPlus Fullstack Application

A web platform for store ratings with role-based access for System Administrators, Store Owners, and Normal Users.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Validation Rules](#validation-rules)
- [Role Functionalities](#role-functionalities)
- [Demo Users](#demo-users)
- [Notes](#notes)

---

## Features

- User authentication (JWT)
- Role-based dashboards (admin, owner, user)
- Store management (admin)
- User management (admin)
- Store ratings (user)
- Owner dashboard (see ratings for their store)
- Sorting/filtering on all lists
- Secure password hashing and validation

---

## Tech Stack

- **Backend:** Node.js, Express.js, PostgreSQL, TypeORM, JWT
- **Frontend:** React.js, Axios, React Router

---

## Setup Instructions

### Backend Setup

1. **Clone the repository and navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure PostgreSQL:**
   - Edit `ormconfig.js` with your DB credentials.
   - Make sure PostgreSQL is running and a database (e.g., `eduplus`) is created.

4. **Create the first admin user:**
   - Manually insert into the database, or use a seed script.
   - Example SQL (replace the password hash with a bcrypt hash of your password):
     ```sql
     INSERT INTO users (name, email, password, address, role)
     VALUES (
       'System Administrator Example Name',
       'admin@example.com',
       '$2a$10$yourbcryptpasswordhash',
       'Admin Address',
       'admin'
     );
     ```
   - To generate a bcrypt hash:
     ```js
     require('bcryptjs').hashSync('YourPassword@1', 10)
     ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
   - Runs at `http://localhost:4000/api`

---

### Frontend Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend app:**
   ```bash
   npm start
   ```
   - Runs at `http://localhost:3000`
   - Connects to backend at `http://localhost:4000/api`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register as normal user
- `POST /api/auth/login` — Login (returns JWT)

### Users (Admin)
- `GET /api/users` — List/filter users
- `POST /api/users` — Create user (admin/user/owner)
- `PUT /api/users/password` — Update own password
- `GET /api/users/me` — Get own info

### Stores
- `GET /api/stores` — List/filter stores (all roles)
- `POST /api/stores` — Create store (admin)
- `GET /api/stores/owner/dashboard` — Owner dashboard (owner)

### Ratings
- `POST /api/ratings` — Submit/update rating (user)
- `GET /api/ratings` — List all ratings (admin)

---

## Validation Rules

- **Name:** 20–60 characters
- **Address:** max 400 characters
- **Password:** 8–16 characters, at least one uppercase letter, at least one special character
- **Email:** valid email format

---

## Role Functionalities

### System Administrator
- Add new stores, normal users, and admin users
- Dashboard: total users, stores, ratings
- View/filter users and stores
- View user details (if owner, see their rating)
- Log out

### Normal User
- Register and log in
- Update password
- View/search stores
- See store details, overall rating, and their submitted rating
- Submit/modify ratings (1–5)
- Log out

### Store Owner
- Log in
- Update password
- Dashboard: see users who rated their store and average rating
- Log out

---

## Demo Users

- **Admin:**  
  Email: `admin@example.com`  
  Password: `AdminPass@1`

- **Owner:**  
  Email: `owner@example.com`  
  Password: `OwnerPass@1`

- **User:**  
  Register via the frontend or use:  
  Email: `user@example.com`  
  Password: `UserPass@1`

---

## Notes

- All protected endpoints require `Authorization: Bearer <token>` header.
- To create the first admin, insert directly into the database.
- For store creation, the owner must exist and have the `"owner"` role.
- Logout is handled on the frontend by removing the JWT token.

---

**This README covers both backend and frontend setup