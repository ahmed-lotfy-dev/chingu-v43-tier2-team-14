# Step 1: Install and Build Frontend
FROM node:20-alpine AS frontend-build

# Set working directory
WORKDIR /frontend

# Copy only the package.json and package-lock.json to ensure npm install works
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy all other frontend files (including index.html and src directory)
COPY ./frontend .

# Run the build command for the frontend
RUN npm run build

# Step 2: Install Backend
FROM node:20-alpine AS backend-build

# Set working directory
WORKDIR /backend

# Copy backend package.json and package-lock.json
COPY ./backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source files
COPY ./backend ./

# Step 3: Combine Frontend and Backend and Setup PM2
FROM node:20-alpine

# Install PM2 globally
RUN npm install -g pm2

# Copy backend files from the backend build stage
COPY --from=backend-build ./backend ./backend

# Copy the frontend build output into the backend's public folder
COPY --from=frontend-build ./frontend/dist ./backend/public

# Expose the necessary ports
EXPOSE 4000
EXPOSE 3000

ENV APP_HOME={APP_HOME}
ENV GOOGLE_BOOKAPI={GOOGLE_BOOKAPI}
ENV GOOGLE_BOOKAPI_URL={GOOGLE_BOOKAPI_URL}
ENV GOOGLE_ID={GOOGLE_ID}
ENV GOOGLE_SECRET={GOOGLE_SECRET}
ENV MONGO_URI={MONGO_URI}
ENV NYTIMES_BOOK_KEY={NYTIMES_BOOK_KEY}
ENV NYTIMES_BOOK_SECRET={NYTIMES_BOOK_SECRET}
ENV NYTIMES_BOOK_URL={NYTIMES_BOOK_URL}
ENV PORT={PORT}
ENV SESSION_SECRET={SESSION_SECRET}
ENV VITE_BACKEND_URL={VITE_BACKEND_URL}
# Set environment variable
ENV NODE_ENV=production

# Copy PM2 ecosystem config
COPY ./ecosystem.config.cjs ./ecosystem.config.cjs

# Start the applications using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]