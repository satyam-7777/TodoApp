# TodoApp

A full-stack Todo application built with **React, Node.js, Express, and MongoDB**. It allows users to securely manage their personal tasks through a simple and responsive interface.
App Live url : https://todoapp-smqs.onrender.com/

## Features

- User signup and login
- JWT authentication with HTTP-only cookies
- Persistent authentication after page refresh
- Protected dashboard
- Create, view, edit, and delete todos
- Mark todos as pending or completed
- Set task priority: Low, Medium, or High
- User-specific tasks
- Form validation and error handling
- Loading states for user actions
- Responsive UI

## How to Use

1. **Create an account**  
   Sign up with your name, email, phone number, and password. After successful signup, you will be automatically logged in.

2. **Log in**  
   Log in with your registered email and password to access the dashboard.

3. **Add a Todo**  
   Click **Add Todo**, enter the task name, description, and priority, then save it.

4. **Manage Todos**
   - Click a todo to view its details.
   - Click the edit button to update a todo.
   - Click the delete button to remove a todo.
   - Use the checkbox to mark a todo as completed or pending.

5. **Track Progress**  
   View your completed and total todos on the dashboard.

6. **Log out**  
   Click **Logout** from the navigation bar to end your session.

## Tech Stack

React, React Router, JavaScript, CSS, Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Authentication

Authentication is implemented using **JWT and HTTP-only cookies**.

When a user signs up or logs in:

1. The server validates the credentials.
2. The password is hashed using `bcryptjs`.
3. A JWT is generated and stored in an HTTP-only cookie.
4. Protected routes verify the JWT before allowing access.
5. Tasks are associated with the authenticated user.

The frontend checks the `/api/v1/users/me` endpoint when the application starts to restore the logged-in user after a page refresh.

## API Endpoints

### Authentication

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | `/api/v1/users/signup` | Create an account |
| POST   | `/api/v1/users/login`  | Log in            |
| POST   | `/api/v1/users/logout` | Log out           |
| GET    | `/api/v1/users/me`     | Get current user  |

### Todos

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/v1/tasks`     | Get user's todos    |
| POST   | `/api/v1/tasks`     | Create a todo       |
| GET    | `/api/v1/tasks/:id` | Get a specific todo |
| PATCH  | `/api/v1/tasks/:id` | Update a todo       |
| DELETE | `/api/v1/tasks/:id` | Delete a todo       |

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB or MongoDB Atlas

### Installation

Clone the repository and install the dependencies:

```bash
git clone <your-github-repository-url>
cd todo-app
npm install
cd client
npm install
cd ..
```

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TOKEN_EXPIRES_IN=1d
SERVER_PORT=8000
NODE_ENV=development
```

Do not commit your actual environment variables or secrets to GitHub.

### Run the Application

Start both frontend and backend:

```bash
npm run dev
```

Or run them separately:

```bash
npm run server
```

```bash
npm run client
```

The React development server runs on port `3000` and the Express server
runs on port `8000`.

## Author

**Satyam Patel**

## License

This project is created for learning and portfolio purposes.
