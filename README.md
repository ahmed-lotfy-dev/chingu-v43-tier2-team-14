# Virtual Book App (Chingu-v43-tier-2-team-14)

## Overview

Virtual Book App is a modern, full-stack virtual bookstore that provides users with a seamless experience for discovering, searching, and managing their book collections. The application integrates with Google Books API and NY Times Best Sellers API to provide comprehensive book information and recommendations.

## Features

- Multi-page app with dynamic routing
- Search books by title and author
- Filter books by category and language
- Sort books by various parameters
- Add books to wishlist
- Google authentication
- Responsive design for all device sizes
- View featured and best-selling books
- Redis caching for improved performance
- Comprehensive book details view

## Live Demo

- **Frontend:** [View App](https://v43-tier2-team14-frontend.onrender.com/)
- **Backend:** [API Server](https://v43-tier2-team14-backend.onrender.com/)
- **API Documentation:** [Postman Docs](https://documenter.getpostman.com/view/18748695/2s93Xx1jjT)

## Technologies Used

### Frontend

- [React](https://react.dev/) (Vite)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Router](https://reactrouter.com/)
- React Hooks
- React Icons
- TypeScript

### Backend

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (Mongoose)
- [Passport.js](http://www.passportjs.org/) (Google OAuth)
- Express Session
- Redis (caching)
- TypeScript

## Getting Started

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/) (recommended, or use npm/yarn)
- MongoDB instance
- Redis server
- Google OAuth credentials
- Google Books API key
- NY Times API key

### Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/chingu-voyages/v43-tier2-team-14.git
cd v43-tier2-team-14
```

#### 2. Frontend Setup

```bash
cd frontend
pnpm install # or npm install
# Create .env.development and add:
# VITE_BACKEND_URL="http://localhost:4000"
pnpm run dev # or npm run dev
```

#### 3. Backend Setup

```bash
cd ../backend
pnpm install # or npm install
# Create .env and add the following environment variables:
# (see below for details)
pnpm run dev # or npm run dev
```

### Required Environment Variables

**Backend (.env):**

```
PORT=4000
HTTPS_PORT=443
MONGO_URI=your_mongodb_uri
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GOOGLE_BOOKAPI=your_google_books_api_key
SESSION_SECRET=your_session_secret
GOOGLE_BOOKAPI_URL=https://www.googleapis.com/books/v1/volumes
APP_HOME=http://localhost:4000
NYTIMES_BOOK_KEY=your_nytimes_api_key
NYTIMES_BOOK_SECRET=your_nytimes_secret
NYTIMES_BOOK_URL=https://api.nytimes.com/svc/books/v3
```

**Frontend (.env.development):**

```
VITE_BACKEND_URL=http://localhost:4000
```

## API Usage

The backend exposes several RESTful endpoints. Here are the key routes:

### Authentication

- `POST /api/auth/google/callback` — Google OAuth login
- `POST /api/auth/logout` — Logout user
- `GET /api/auth/session` — Get current session
- `GET /api/auth/user` — Get user profile

### Books

- `GET /api/books` — List books (supports query params: category, lang, orderBy, limit, index)
- `GET /api/books/featured-books` — Get featured books (NY Times)
- `GET /api/books/single-book/:title` — Get a single book by title
- `GET /api/books/by-title/:id` — Get a book by Google Books ID
- `GET /api/books/search-books/:query` — Search books by query
- `GET /api/books/get-user-books/:userId` — Get books for a user
- `POST /api/books/add-book` — Add a book to a user's collection
- `DELETE /api/books/remove-book` — Remove a book from a user's collection

See [API Documentation](https://documenter.getpostman.com/view/18748695/2s93Xx1jjT) for full details and request/response examples.

## Performance Requirements

- API response time < 500ms
- Page load time < 2 seconds
- Search results loading < 1 second
- Support for multiple concurrent users
- Efficient caching mechanism
- Optimized database queries

## Contributing

We welcome contributions! Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

- Fork the repo and create your branch from `main`.
- Run the app locally and test your changes.
- Open a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License.

---

_Developed by Chingu Voyage v43 Tier 2 Team 14_
