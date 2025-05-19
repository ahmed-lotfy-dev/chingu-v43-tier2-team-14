# Virtual Book App - Technical Documentation

## 1. Project Structure

### 1.1 Frontend Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Shared components
│   │   ├── layout/         # Layout components
│   │   └── features/       # Feature-specific components
│   ├── pages/              # Page components
│   │   ├── Home/          # Home page
│   │   ├── Search/        # Search page
│   │   ├── BookDetails/   # Book details page
│   │   └── Profile/       # User profile page
│   ├── store/             # Zustand state management
│   │   ├── auth.ts       # Authentication state
│   │   └── books.ts      # Books state
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service calls
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                # Static assets
├── index.html            # Entry HTML file
└── vite.config.ts        # Vite configuration
```

### 1.2 Backend Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── auth.ts       # Authentication controller
│   │   └── books.ts      # Books controller
│   ├── models/           # Database models
│   │   ├── User.ts      # User model
│   │   └── Book.ts      # Book model
│   ├── routes/           # API routes
│   │   ├── auth.ts      # Auth routes
│   │   └── books.ts     # Book routes
│   ├── services/         # Business logic
│   │   ├── google.ts    # Google Books service
│   │   └── nytimes.ts   # NY Times service
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
├── logs/                 # Application logs
└── drizzle/             # Database migrations
```

## 2. Key Components

### 2.1 Frontend Components

#### Authentication Components

- `GoogleAuthButton`: Handles Google OAuth login
- `AuthGuard`: Protects authenticated routes
- `UserProfile`: Displays user information

#### Book Components

- `BookCard`: Displays book preview
- `BookList`: Renders list of books
- `BookDetails`: Shows detailed book information
- `SearchBar`: Handles book search
- `WishlistButton`: Manages wishlist functionality

#### Layout Components

- `Header`: Main navigation
- `Footer`: Site footer
- `Layout`: Main layout wrapper
- `LoadingSpinner`: Loading state indicator

### 2.2 Backend Components

#### Controllers

- `AuthController`: Handles authentication logic
- `BookController`: Manages book-related operations
- `UserController`: Handles user data operations

#### Services

- `GoogleBooksService`: Interacts with Google Books API
- `NYTimesService`: Fetches NY Times bestsellers
- `CacheService`: Manages Redis caching
- `AuthService`: Handles authentication logic

#### Middleware

- `authMiddleware`: Validates authentication
- `errorMiddleware`: Handles errors
- `loggingMiddleware`: Logs requests
- `rateLimitMiddleware`: Implements rate limiting

## 3. State Management

### 3.1 Frontend State

```typescript
// Auth State
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Books State
interface BooksState {
  books: Book[]
  featuredBooks: Book[]
  searchResults: Book[]
  wishlist: Book[]
  isLoading: boolean
  error: string | null
}
```

### 3.2 Backend State

- MongoDB for persistent storage
- Redis for caching and session management
- In-memory state for temporary data

## 4. API Integration

### 4.1 Google Books API

```typescript
interface GoogleBooksResponse {
  items: Array<{
    id: string
    volumeInfo: {
      title: string
      authors: string[]
      description: string
      imageLinks: {
        thumbnail: string
      }
      // ... other fields
    }
  }>
}
```

### 4.2 NY Times API

```typescript
interface NYTimesResponse {
  results: Array<{
    title: string
    author: string
    description: string
    rank: number
    // ... other fields
  }>
}
```

## 5. Database Schema

### 5.1 User Collection

```typescript
interface User {
  _id: ObjectId
  googleId: string
  email: string
  displayName: string
  wishlist: Book[]
  createdAt: Date
  updatedAt: Date
}
```

### 5.2 Book Collection

```typescript
interface Book {
  _id: ObjectId
  googleBooksId: string
  title: string
  authors: string[]
  description: string
  thumbnail: string
  categories: string[]
  publishedDate: string
  pageCount: number
  language: string
}
```

## 6. Error Handling

### 6.1 Frontend Error Handling

```typescript
interface ErrorResponse {
  message: string
  code: string
  status: number
}

// Error boundary component
class ErrorBoundary extends React.Component {
  // ... implementation
}
```

### 6.2 Backend Error Handling

```typescript
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message)
  }
}

// Global error handler
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ... implementation
}
```

## 7. Testing

### 7.1 Frontend Tests

```typescript
// Component test example
describe("BookCard", () => {
  it("renders book information correctly", () => {
    // ... test implementation
  })
})

// Hook test example
describe("useAuth", () => {
  it("handles login correctly", () => {
    // ... test implementation
  })
})
```

### 7.2 Backend Tests

```typescript
// Controller test example
describe("BookController", () => {
  it("fetches books successfully", async () => {
    // ... test implementation
  })
})

// Service test example
describe("GoogleBooksService", () => {
  it("searches books correctly", async () => {
    // ... test implementation
  })
})
```

## 8. Deployment

### 8.1 Frontend Deployment

- Build process: `pnpm build`
- Output directory: `dist/`
- Static file serving
- Environment configuration

### 8.2 Backend Deployment

- Build process: `pnpm build`
- Output directory: `dist/`
- PM2 process management
- Environment configuration

## 9. Monitoring and Logging

### 9.1 Frontend Monitoring

- Error tracking
- Performance metrics
- User analytics

### 9.2 Backend Monitoring

- Request logging
- Error logging
- Performance monitoring
- Database monitoring

## 10. Security Measures

### 10.1 Frontend Security

- XSS prevention
- CSRF protection
- Secure storage
- Input validation

### 10.2 Backend Security

- Authentication
- Authorization
- Rate limiting
- Input validation
- API key protection
