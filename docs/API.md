# Virtual Book App - API Documentation

## Base URL

```
https://v43-tier2-team14-backend.onrender.com
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
- `limit` (optional): Number of results (default: 10)
- `page` (optional): Page number for pagination (default: 1)

**Response**

```json
{
  "items": [
    {
      "id": "string",
      "volumeInfo": {
        "title": "string",
        "authors": ["string"],
        "description": "string",
        "imageLinks": {
          "smallThumbnail": "string",
          "thumbnail": "string"
        },
        "categories": ["string"],
        "publishedDate": "string",
        "pageCount": number,
        "language": "string"
      }
    }
  ],
  "nextCursor": number | null
}
```

### Get Featured Books

```http
GET /api/books/featured-books
```

**Response**

```json
{
  "featuredBooks": {
    "results": [
      {
        "list_name": "string",
        "display_name": "string",
        "bestsellers_date": "string",
        "published_date": "string",
        "rank": number,
        "rank_last_week": number,
        "weeks_on_list": number,
        "asterisk": number,
        "dagger": number,
        "amazon_product_url": "string",
        "isbns": [
          {
            "isbn10": "string",
            "isbn13": "string"
          }
        ],
        "book_details": [
          {
            "title": "string",
            "description": "string",
            "contributor": "string",
            "author": "string",
            "contributor_note": "string",
            "price": number,
            "age_group": "string",
            "publisher": "string",
            "primary_isbn13": "string",
            "primary_isbn10": "string"
          }
        ]
      }
    ]
  }
}
```

### Get Book by ISBN

```http
GET /api/books/by-isbn/:isbn
```

**Response**

```json
{
  "book": {
    "items": [
      {
        "id": "string",
        "volumeInfo": {
          "title": "string",
          "authors": ["string"],
          "description": "string",
          "imageLinks": {
            "smallThumbnail": "string",
            "thumbnail": "string"
          },
          "categories": ["string"],
          "publishedDate": "string",
          "pageCount": number,
          "language": "string"
        }
      }
    ]
  }
}
```

### Search Books

```http
GET /api/books/search-books/:query
```

**Response**

```json
{
  "message": "Books fetched from API and cached",
  "books": {
    "items": [
      {
        "id": "string",
        "volumeInfo": {
          "title": "string",
          "authors": ["string"],
          "description": "string",
          "imageLinks": {
            "smallThumbnail": "string",
            "thumbnail": "string"
          },
          "categories": ["string"],
          "publishedDate": "string",
          "pageCount": number,
          "language": "string"
        }
      }
    ]
  }
}
```

### Get User Books

```http
GET /api/books/get-user-books/:userId
```

**Response**

```json
{
  "message": "User Books Fetched Successfully",
  "books": [
    {
      "id": "string",
      "userId": "string",
      "title": "string",
      "categories": ["string"],
      "pageCount": number,
      "imageLinks": {
        "smallThumbnail": "string",
        "thumbnail": "string"
      },
      "description": "string",
      "authors": ["string"]
    }
  ]
}
```

### Add Book

```http
POST /api/books/add-book
```

**Request Body**

```json
{
  "userId": "string",
  "title": "string",
  "categories": ["string"],
  "pageCount": number,
  "imageLinks": {
    "smallThumbnail": "string",
    "thumbnail": "string"
  },
  "description": "string",
  "authors": ["string"]
}
```

**Response**

```json
{
  "message": "Book Added Successfully",
  "book": {
    "id": "string",
    "userId": "string",
    "title": "string",
    "categories": ["string"],
    "pageCount": number,
    "imageLinks": {
      "smallThumbnail": "string",
      "thumbnail": "string"
    },
    "description": "string",
    "authors": ["string"]
  }
}
```

### Remove Book

```http
DELETE /api/books/remove-book
```

**Request Body**

```json
{
  "userId": "string",
  "id": "string"
}
```

**Response**

```json
{
  "message": "Book deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "message": "Error message describing the issue"
}
```

### 404 Not Found

```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "message": "Internal server error message"
}
```

## Caching

The API implements Redis caching for the following endpoints:

- `/api/books` - Cached for 24 hours
- `/api/books/featured-books` - Cached for 1 hour
- `/api/books/by-isbn/:isbn` - Cached for 7 days
- `/api/books/search-books/:query` - Cached for 24 hours

## Rate Limiting

The API implements rate limiting to prevent abuse. Please contact the development team if you need higher rate limits.
