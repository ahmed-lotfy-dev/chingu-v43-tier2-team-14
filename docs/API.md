# Virtual Book App - API Documentation

## Base URL

```
https://books-app-b.ahmedlotfy.dev
```

## Authentication

### Google OAuth Login

```http
POST /api/auth/google/callback
```

**Response**

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "picture": "string"
  },
  "session": {
    "id": "string",
    "expiresAt": "string"
  }
}
```

### Logout

```http
POST /api/auth/logout
```

**Response**

```json
{
  "success": true
}
```

### Get Session

```http
GET /api/auth/session
```

**Response**

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "picture": "string"
  },
  "expires": "string"
}
```

### Get User Profile

```http
GET /api/auth/user
```

**Response**

```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "picture": "string",
  "wishlist": []
}
```

## Books

### Get Books

```http
GET /api/books
```

**Query Parameters**

- `category` (optional): Filter by category
- `lang` (optional): Filter by language
- `orderBy` (optional): Sort order (e.g., "newest", "oldest")
- `limit` (optional): Number of results (default: 20)
- `index` (optional): Pagination offset (default: 0)

**Response**

```json
{
  "books": [
    {
      "_id": "string",
      "googleBooksId": "string",
      "title": "string",
      "authors": ["string"],
      "description": "string",
      "thumbnail": "string",
      "categories": ["string"],
      "publishedDate": "string",
      "pageCount": number,
      "language": "string"
    }
  ],
  "total": number,
  "hasMore": boolean
}
```

### Get Featured Books

```http
GET /api/books/featured-books
```

**Response**

```json
{
  "books": [
    {
      "_id": "string",
      "title": "string",
      "author": "string",
      "description": "string",
      "rank": number,
      "thumbnail": "string"
    }
  ]
}
```

### Get Single Book

```http
GET /api/books/single-book/:title
```

**Response**

```json
{
  "_id": "string",
  "googleBooksId": "string",
  "title": "string",
  "authors": ["string"],
  "description": "string",
  "thumbnail": "string",
  "categories": ["string"],
  "publishedDate": "string",
  "pageCount": number,
  "language": "string"
}
```

### Get Book by Google Books ID

```http
GET /api/books/by-title/:id
```

**Response**

```json
{
  "_id": "string",
  "googleBooksId": "string",
  "title": "string",
  "authors": ["string"],
  "description": "string",
  "thumbnail": "string",
  "categories": ["string"],
  "publishedDate": "string",
  "pageCount": number,
  "language": "string"
}
```

### Search Books

```http
GET /api/books/search-books/:query
```

**Query Parameters**

- `limit` (optional): Number of results (default: 20)
- `index` (optional): Pagination offset (default: 0)

**Response**

```json
{
  "books": [
    {
      "_id": "string",
      "googleBooksId": "string",
      "title": "string",
      "authors": ["string"],
      "description": "string",
      "thumbnail": "string",
      "categories": ["string"],
      "publishedDate": "string",
      "pageCount": number,
      "language": "string"
    }
  ],
  "total": number,
  "hasMore": boolean
}
```

## User Books

### Get User Books

```http
GET /api/books/get-user-books/:userId
```

**Response**

```json
{
  "books": [
    {
      "_id": "string",
      "googleBooksId": "string",
      "title": "string",
      "authors": ["string"],
      "description": "string",
      "thumbnail": "string",
      "categories": ["string"],
      "publishedDate": "string",
      "pageCount": number,
      "language": "string"
    }
  ]
}
```

### Add Book to User Collection

```http
POST /api/books/add-book
```

**Request Body**

```json
{
  "userId": "string",
  "bookId": "string"
}
```

**Response**

```json
{
  "message": "Book added successfully",
  "book": {
    "_id": "string",
    "googleBooksId": "string",
    "title": "string",
    "authors": ["string"],
    "description": "string",
    "thumbnail": "string",
    "categories": ["string"],
    "publishedDate": "string",
    "pageCount": number,
    "language": "string"
  }
}
```

### Remove Book from User Collection

```http
DELETE /api/books/remove-book
```

**Request Body**

```json
{
  "userId": "string",
  "bookId": "string"
}
```

**Response**

```json
{
  "message": "Book removed successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": {
    "message": "Invalid request parameters",
    "code": "BAD_REQUEST",
    "status": 400
  }
}
```

### 401 Unauthorized

```json
{
  "error": {
    "message": "Authentication required",
    "code": "UNAUTHORIZED",
    "status": 401
  }
}
```

### 403 Forbidden

```json
{
  "error": {
    "message": "Access denied",
    "code": "FORBIDDEN",
    "status": 403
  }
}
```

### 404 Not Found

```json
{
  "error": {
    "message": "Resource not found",
    "code": "NOT_FOUND",
    "status": 404
  }
}
```

### 500 Internal Server Error

```json
{
  "error": {
    "message": "Internal server error",
    "code": "SERVER_ERROR",
    "status": 500
  }
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse. The current limits are:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

When rate limit is exceeded, the API returns:

```json
{
  "error": {
    "message": "Too many requests",
    "code": "RATE_LIMIT_EXCEEDED",
    "status": 429
  }
}
```

## Caching

The API implements caching for the following endpoints:

- `GET /api/books/featured-books` (1 hour)
- `GET /api/books/single-book/:title` (24 hours)
- `GET /api/books/by-title/:id` (24 hours)

Cache headers are included in responses:

```
Cache-Control: public, max-age=3600
ETag: "etag-value"
```

## Authentication

All authenticated endpoints require a valid session token. The token should be included in the request header:

```
Authorization: Bearer <token>
```

## Pagination

Endpoints that return lists of books support pagination using the following query parameters:

- `limit`: Number of items per page (default: 20, max: 50)
- `index`: Offset for pagination (default: 0)

The response includes pagination metadata:

```json
{
  "books": [...],
  "total": number,
  "hasMore": boolean
}
```
