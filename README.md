# Virtual Book App (Chingue-v43-tier-2-team-14)

## Overview

The project is a virtual book store made by react with fetched data from external API.

1. Google Books API.
2. NY Times Best Seller's API.

## Features

- multi pages with dynamic routing
- search books by title and author
- functionality to add book to wishlist
- authentication with google
- responsive desgin

## Deployed Links

Frontend Deployed Link :
https://v43-tier2-team14-frontend.onrender.com/

Backend Deploted Link :
https://v43-tier2-team14-backend.onrender.com/

Backend Documentation link :
https://documenter.getpostman.com/view/18748695/2s93Xx1jjT

## How To Use

To be able to use this react app locally in a development environment you will need the following:

1. You will need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer.

2. Then From your terminal, you should do the following:

```cmd
# Clone this repository
git clone https://github.com/chingu-voyages/v43-tier2-team-14.git

# Go into the repository
cd v43-tier2-team-14

# navigate to frontend folder
cd frontend

# Install dependencies
npm install

# create .env.development if running in development
and then add
VITE_BACKEND_URL="http://localhost:4000"

# Run the app
npm run dev
```

3. In Another console

```
# Navigate back to the v43-tier2-team-14 folder

# Then go to backend folder

# Install dependencies
npm install

# Create .env file  add the necessary secrets environment variables

 PORT = ""
 HTTPS_PORT = ""
 MONGO_URI = ""
 GOOGLE_ID = ""
 GOOGLE_SECRET = ""
 GOOGLE_BOOKAPI = ""
 SESSION_SECRET = ""
 GOOGLE_BOOKAPI_URL = ""
 APP_HOME = ""
 NYTIMES_BOOK_KEY = ""
 NYTIMES_BOOK_SECRET = ""
 NYTIMES_BOOK_URL = ""

# Run the backend server
npm run dev
```


## Technologies used

### Frontend

- Vite
- TailwindCSS
- Zustand
- React Router
- React Hooks
- React icons

### Backend

- Express
- MongoDB
- Passport
- Mongoose
- Express Session

## Contributing

Kindly check the contributing instructions listed in
[CONTRIBUTING file](https://github.com/chingu-voyages/v43-tier2-team-14/blob/main/CONTRIBUTING.md)
