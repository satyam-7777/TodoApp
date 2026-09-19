# TodoApp

A full-stack Todo application built with **React, Node.js, Express.js,
and MongoDB**.

The application provides user authentication, protected routes, and a
personal Todo dashboard where authenticated users can create, view,
edit, complete, and delete their own tasks.

This project was built as a full-stack portfolio project to practice
**REST API development, JWT authentication, MongoDB/Mongoose, React
Context API, protected routing, API integration, and production
deployment**.

---

## Live Project

**Live URL:**\
<https://todoapp-smqs.onrender.com>

**GitHub Repository:**\
<https://github.com/satyam-7777/TodoApp>

---

## Features

### Authentication

- User signup and login
- JWT-based authentication
- JWT stored in an HTTP-only cookie
- Password hashing using `bcryptjs`
- Protected dashboard route
- Authentication restored after page refresh
- Logout functionality
- Current-user endpoint

### Todo Management

- Create a new Todo
- View Todo details
- Edit an existing Todo
- Delete a Todo
- Mark Todo as completed or pending
- Set Todo priority
  - Low
  - Medium
  - High
- View total and completed Todo count
- Each user's Todo list is isolated from other users

### User Experience

- Responsive interface
- Loading states during API operations
- Error messages for failed operations
- Modal-based Todo form
- Separate login and signup pages
- Public and protected routes
- Not Found page for invalid routes

---

## Application Flow

The application follows a simple authentication and Todo management
flow:

```text
User
 │
 ├── Sign Up
 │      │
 │      ├── Validate input
 │      ├── Hash password
 │      ├── Create user in MongoDB
 │      ├── Generate JWT
 │      └── Store JWT in HTTP-only cookie
 │
 ├── Login
 │      │
 │      ├── Find user
 │      ├── Compare password
 │      ├── Generate JWT
 │      └── Store JWT in HTTP-only cookie
 │
 └── Dashboard
        │
        ├── Authenticate user
        ├── Fetch user's Todos
        │
        ├── Create Todo
        ├── View Todo
        ├── Edit Todo
        ├── Complete / Pending
        └── Delete Todo
```

---

# Tech Stack

## Frontend

- React
- JavaScript
- React Router
- Context API
- Fetch API
- CSS
- Lucide React

## Backend

- Node.js
- Express.js
- REST APIs
- JWT
- bcryptjs
- Cookie Parser
- CORS

## Database

- MongoDB
- Mongoose

## Development

- Nodemon
- Concurrently
- Create React App

## Deployment

- Render
- MongoDB Atlas

---

# Frontend Architecture

The React application is divided into pages, reusable components, and
Context API providers.

## Pages

### Landing Page

The landing page introduces the Todo application and provides navigation
to authentication pages.

### Signup Page

Allows a new user to create an account using:

- Name
- Email
- Phone number
- Password
- Confirm password

### Login Page

Allows an existing user to log in using:

- Email
- Password

### Dashboard Page

The dashboard is protected and can only be accessed by an authenticated
user.

It contains:

- Navigation bar
- Welcome message
- Todo board
- Todo count
- Todo cards
- Add Todo functionality
- Footer

### Not Found Page

Handles routes that do not exist in the React application.

---

# Authentication Architecture

Authentication is implemented using **JWT and HTTP-only cookies**.

## Signup

When a user submits the signup form:

1.  The frontend sends the signup data to the backend.
2.  The backend validates the required fields.
3.  Password and confirm password are compared.
4.  The backend checks whether the email already exists.
5.  The password is hashed using `bcryptjs`.
6.  The user is stored in MongoDB.
7.  A JWT is generated using `jsonwebtoken`.
8.  The JWT is stored in an HTTP-only cookie.
9.  The created user is returned to the frontend.
10. The frontend navigates to the dashboard.

## Login

When a user logs in:

1.  The frontend sends email and password.
2.  The backend searches for the user.
3.  The stored password is selected for authentication.
4.  `bcryptjs` compares the submitted password with the hashed password.
5.  A JWT is generated after successful authentication.
6.  The JWT is stored in an HTTP-only cookie.
7.  User information is returned to the frontend.
8.  The frontend navigates to the dashboard.

## Authentication Middleware

Protected backend routes use the `authenticate` middleware.

The middleware:

1.  Reads the `token` cookie.
2.  Rejects the request if the cookie is missing.
3.  Verifies the JWT.
4.  Finds the corresponding user.
5.  Attaches the user to `req.user`.
6.  Passes control to the requested route.

```text
Request
  │
  ▼
Read token cookie
  │
  ├── No token ──────► 401 Unauthorized
  │
  ▼
Verify JWT
  │
  ├── Invalid token ─► Error response
  │
  ▼
Find User
  │
  ├── User not found ─► 404 Error
  │
  ▼
req.user = user
  │
  ▼
Protected Controller
```

---

# HTTP-Only Cookie

The JWT is stored in an HTTP-only cookie.

This means the authentication token is not directly accessible through
client-side JavaScript.

The cookie is configured with:

- `httpOnly: true`
- `sameSite: "lax"`
- `secure: true` in production
- `path: "/"`

The frontend sends requests with:

```js
credentials: "include";
```

This allows the browser to include the authentication cookie with API
requests.

---

# Authentication State

The frontend uses `AuthContext` to manage authentication state.

The context maintains:

- `user`
- `authLoading`
- `actionLoading`
- `setUser`
- `logoutUser`

When the application starts, it calls:

```text
GET /api/v1/users/me
```

This checks whether the existing authentication cookie is still valid.

If the user is authenticated, the current user is restored into React
state.

This allows authentication to survive a browser page refresh while the
JWT remains valid.

---

# Protected Routes

React Router is used to control access to application pages.

The `AuthRoute` component supports two route types:

### Public Routes

Used for:

- `/login`
- `/signup`

If an authenticated user tries to access these pages, they are
redirected to the dashboard.

### Protected Routes

Used for:

- `/dashboard`

If a user is not authenticated, they are redirected away from the
protected page.

---

# Todo Architecture

Todos are associated with the currently authenticated user.

Each Todo contains:

- Name
- Description
- Priority
- Status
- User reference
- Created timestamp
- Updated timestamp

The Todo model uses Mongoose.

```text
User
 │
 ├── Todo
 ├── Todo
 ├── Todo
 └── Todo
```

A Todo stores the user's MongoDB ObjectId in its `user` field.

When fetching Todos, the backend uses the authenticated user's ID:

```js
Task.find({ user: req.user.id });
```

This ensures that a user receives only their own Todos.

---

# Todo Status

Each Todo can have one of two statuses:

```text
pending
completed
```

The default status is:

```text
pending
```

Clicking the checkbox toggles the status between pending and completed.

---

# Todo Priority

Each Todo supports three priority levels:

```text
Low
Medium
High
```

The default priority is:

```text
Low
```

Mongoose enum validation prevents unsupported priority values from being
stored.

---

# Todo Operations

## Create Todo

The user opens the Todo form, enters:

- Todo name
- Description
- Priority

The frontend sends:

```text
POST /api/v1/tasks
```

The backend associates the Todo with the authenticated user.

---

## View Todo

Clicking a Todo opens the Todo form in view mode.

The user can inspect:

- Todo name
- Description
- Priority

Fields are disabled while the Todo is being viewed.

---

## Update Todo

The user can open a Todo in edit mode and update its information.

The frontend sends:

```text
PATCH /api/v1/tasks/:id
```

The backend ensures that the Todo belongs to the authenticated user
before updating it.

---

## Complete Todo

The checkbox sends a partial update:

```text
PATCH /api/v1/tasks/:id
```

with the new status:

```json
{
  "status": "completed"
}
```

or:

```json
{
  "status": "pending"
}
```

The updated Todo is then reflected in the frontend state.

---

## Delete Todo

The delete button sends:

```text
DELETE /api/v1/tasks/:id
```

The backend deletes the Todo only when it belongs to the authenticated
user.

The frontend removes the deleted Todo from its local task state after a
successful response.

---

# API Documentation

Base API path:

```text
/api/v1
```

---

## Authentication Endpoints

### Sign Up

```http
POST /api/v1/users/signup
```

Creates a new user account.

### Request Body

```json
{
  "name": "Satyam Patel",
  "email": "satyam@example.com",
  "phone": "9876543210",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Successful Response

```json
{
  "status": "success",
  "data": {
    "user": {}
  }
}
```

A JWT is also stored in an HTTP-only cookie.

---

## Login

```http
POST /api/v1/users/login
```

### Request Body

```json
{
  "email": "satyam@example.com",
  "password": "password123"
}
```

### Successful Response

```json
{
  "status": "success",
  "data": {
    "user": {}
  }
}
```

---

## Current User

```http
GET /api/v1/users/me
```

Returns the currently authenticated user.

Authentication is required.

---

## Logout

```http
POST /api/v1/users/logout
```

Clears the authentication cookie.

Authentication is required.

---

# Todo Endpoints

## Get All Todos

```http
GET /api/v1/tasks
```

Returns all Todos belonging to the authenticated user.

### Example Response

```json
{
  "status": "success",
  "result": 2,
  "data": {
    "tasks": []
  }
}
```

---

## Create Todo

```http
POST /api/v1/tasks
```

### Request Body

```json
{
  "name": "Complete project documentation",
  "description": "Prepare the README file",
  "priority": "High"
}
```

### Successful Response

```json
{
  "status": "success",
  "data": {
    "task": {}
  }
}
```

---

## Get a Specific Todo

```http
GET /api/v1/tasks/:id
```

Returns a specific Todo belonging to the authenticated user.

Example:

```text
GET /api/v1/tasks/65f123456789abcdef123456
```

---

## Update Todo

```http
PATCH /api/v1/tasks/:id
```

### Example Request

```json
{
  "name": "Complete README",
  "description": "Finish the project documentation",
  "priority": "Medium",
  "status": "completed"
}
```

---

## Delete Todo

```http
DELETE /api/v1/tasks/:id
```

Deletes a Todo belonging to the authenticated user.

### Successful Response

```json
{
  "status": "success",
  "message": "Todo deleted successfully"
}
```

---

# Database Models

## User Model

The User collection contains:

- `name`
- `email`
- `phone`
- `password`
- `confirmPassword`
- `createdAt`
- `updatedAt`

Important validations include:

- Name is required.
- Email is required and unique.
- Email is stored in lowercase.
- Phone number follows a 10-digit Indian mobile number format when
  provided.
- Password must contain at least 8 characters.

The password field is configured with:

```js
select: false;
```

so it is not selected by default in normal user queries.

---

## Task Model

The Task collection contains:

```text
name
description
priority
status
user
createdAt
updatedAt
```

The `user` field is a MongoDB ObjectId referencing the User model.

---

# Error Handling

The backend uses a centralized error-handling approach.

## AppError

`AppError` is a custom error class that stores:

- Error message
- HTTP status code
- Error status

Example:

```js
throw new AppError("Todo not found", 404);
```

## catchAsync

Asynchronous controllers are wrapped using `catchAsync`.

This prevents repetitive `try/catch` blocks around every asynchronous
controller and forwards rejected promises to the global error handler.

## Global Error Handler

The application uses a centralized error middleware that returns a
consistent JSON response.

Example:

```json
{
  "status": "failed",
  "message": "Todo not found"
}
```

---

# Development Setup

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

---

# Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Move into the project directory:

```bash
cd TodoApp
```

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
cd ..
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TOKEN_EXPIRES_IN=1d
SERVER_PORT=8000
NODE_ENV=development
```

### Environment Variables

Variable Purpose

---

`MONGO_URI` MongoDB connection string
`JWT_SECRET` Secret used to sign JWT tokens
`TOKEN_EXPIRES_IN` JWT expiration duration
`SERVER_PORT` Express server port
`NODE_ENV` Application environment

Never commit the actual `.env` file or secret values to GitHub.

---

# Running the Application

The project uses separate frontend and backend processes during
development.

## Start Backend

```bash
npm run server
```

The Express server runs on:

```text
http://localhost:8000
```

## Start Frontend

```bash
npm run client
```

The React development server runs on:

```text
http://localhost:3000
```

The React application uses the development proxy configured in
`client/package.json`:

```json
"proxy": "http://localhost:8000"
```

This allows frontend requests such as:

```js
fetch("/api/v1/tasks");
```

to be forwarded to the Express backend during development.

---

# Run Frontend and Backend Together

The project also includes:

```bash
npm run dev
```

This uses `concurrently` to start the backend and frontend development
servers together.

---

# Production Build

The root `package.json` includes a build command that installs the
client dependencies and creates the React production build.

```bash
npm run build
```

The generated React production files are placed inside:

```text
client/build
```

Express serves these static files in production.

The React Router fallback serves:

```text
client/build/index.html
```

for frontend routes.

---

# Deployment

The application can be deployed as a full-stack application on
**Render**.

The production architecture is:

```text
Browser
   │
   ▼
Render
   │
   ├── Express API
   │      │
   │      └── MongoDB Atlas
   │
   └── React Production Build
```

The Express server serves both:

- REST API endpoints
- React production files

---

# Render Deployment Configuration

A typical Render configuration for this project is:

### Build Command

```bash
npm run build
```

### Start Command

```bash
npm start
```

### Environment Variables

Add the following variables in Render:

```text
MONGO_URI
JWT_SECRET
TOKEN_EXPIRES_IN
NODE_ENV
SERVER_PORT
```

For production, `NODE_ENV` should be:

```text
production
```

The server uses the Render-provided port when configured through the
environment variable.

---

# Security Considerations

The project includes several basic security practices:

- Passwords are hashed with `bcryptjs`.
- JWT is stored in an HTTP-only cookie.
- Password is excluded from normal user queries using `select: false`.
- Authentication is required for Todo endpoints.
- Todo queries are scoped to the authenticated user.
- Users cannot access another user's Todo by changing the Todo ID.
- Environment variables are used for secrets and database credentials.
- Production cookies use the `secure` option.

---

# Example User Journey

```text
1. User opens the application
          │
          ▼
2. User creates an account
          │
          ▼
3. Server creates user and sets JWT cookie
          │
          ▼
4. User enters dashboard
          │
          ▼
5. Dashboard fetches user's Todos
          │
          ▼
6. User creates a Todo
          │
          ▼
7. Todo is stored in MongoDB
          │
          ▼
8. New Todo is added to React state
          │
          ▼
9. User can view/edit/complete/delete it
          │
          ▼
10. User logs out
          │
          ▼
11. Authentication cookie is cleared
```

---

# Author

**Satyam Patel**

Backend Software Engineer

---
