# DevConnect

DevConnect is a developer-focused social networking and collaboration platform built with a React frontend and an Express + MongoDB backend. It enables users to register, log in, create and manage posts, view their profile, and search for other developers based on name or username.

This project is designed as a full-stack application where the frontend is separated from the backend and the backend uses JWT-based authentication with refresh-token rotation and secure cookie handling.

## Features

- User registration and login
- JWT authentication with access tokens and refresh tokens
- Secure cookie-based refresh token storage
- Logout and logout-all support
- Protected routes for authenticated users
- Create, read, update, and delete posts
- User profile retrieval with stats
- Search for users by first name, last name, or username
- Responsive frontend built with React + Vite
- Modular component-based UI
- Rate limiting and throttling for API protection
- MongoDB-powered persistence for users and posts

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide icons
- Shadcn-style UI components

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- cookie-parser
- CORS
- express-rate-limit
- express-slow-down
- Morgan for request logging

## Project Structure

```bash
DevConnect/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .gitignore
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── serverController.js
│   ├── middleware/
│   │   ├── authLimiter.js
│   │   ├── authMiddleware.js
│   │   ├── authThrottel.js
│   │   ├── userEndPointsLimiter.js
│   │   └── userEndPThrottel.js
│   ├── models/
│   │   ├── Posts.model.js
│   │   ├── Session.model.js
│   │   └── Users.model.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   └── router.js
│   ├── data/
│   ├── seed/
│   └── utils/
├── devconnect/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── index.html
│   ├── eslint.config.js
│   ├── components.json
│   ├── jsconfig.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── Api/
│   │   ├── AppLayout/
│   │   ├── components/
│   │   │   ├── DialogBoxes/
│   │   │   ├── LeftSideBar/
│   │   │   ├── RightSideBar/
│   │   │   ├── feedLayout/
│   │   │   ├── navbar/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── mock/
│   │   └── pages/
│   │       ├── SearchPage.jsx
│   │       ├── login.jsx
│   │       └── logou.jsx
├── README.md
├── TaskSeparation.md
└── .gitignore
```

## Backend API Overview

The backend is served from the `backend/` folder and exposes authentication and data endpoints.

### Authentication routes
- `POST /auth/registration`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/refresh-token`
- `POST /auth/logoutAll`

### Protected application routes
- `GET /api/posts`
- `POST /api/posts`
- `PATCH /api/posts/:id`
- `DELETE /api/posts/:id`
- `GET /api/user`
- `GET /api/searchusers`

### Notes
- Protected routes use JWT verification via middleware.
- Refresh tokens are stored in HttpOnly cookies.
- Authentication uses secure session management with hashed refresh tokens.
- MongoDB is used as the primary database.
- Rate limiting and throttling are enabled for auth and general user endpoints.

## Frontend Overview

The frontend in `devconnect/` is a Vite-powered React application with:
- login and logout flows
- social feed layout
- profile and search pages
- reusable UI components
- modular structure for future expansion

The app is designed around a developer-centric social feed experience, where users can interact with content and discover others through search and profile views.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB instance or MongoDB Atlas connection
- Git

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/devconnect
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```

4. Start the backend:
   ```bash
   npm run dev
   ```

The backend runs on:
- http://localhost:5000

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd devconnect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

The frontend runs on:
- http://localhost:5173

## Production Build

### Frontend
```bash
cd devconnect
npm run build
```

### Backend
```bash
cd backend
npm start
```

## Environment Notes

- Frontend is configured to communicate with the backend at `http://localhost:5000` through API calls.
- Backend CORS is configured for `http://localhost:5173`.
- The project expects a valid MongoDB connection in `MONGO_URI`.
- JWT secret must be set for authentication and refresh token validation.

## Current Status

This repository currently includes:
- a working backend authentication system
- user registration and login flow
- JWT-based protected API routes
- post CRUD functionality
- profile retrieval
- search by username or name
- a Vite React frontend with structured pages and UI components

The project follows a modular architecture and is structured to support future feature expansion such as:
- follow/follower system
- notifications
- richer profile editing
- post comments and likes
- deploy-ready production setup

## Contributing

Contributions are welcome. To contribute:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

Please keep changes modular and maintain the separation between frontend and backend logic.

## License

This project does not currently include a license file. If you want to publish or share the project publicly, consider adding an open-source license such as MIT.

## Contact

Project owner: Typecaster12

## Summary

DevConnect is a full-stack developer networking application with a React frontend and Express/MongoDB backend. It currently supports authentication, protected API routes, user searching, post creation and management, and a structured frontend layout for a social networking experience for developers.
