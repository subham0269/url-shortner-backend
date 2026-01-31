# URL Shortener API - Required Endpoints Documentation

## Overview

This document outlines the API endpoints needed for a complete URL shortener application. After user authentication (login), these endpoints enable users to create short URLs, view their URLs, and track analytics.

---

## Authentication Endpoints (Already Implemented)

### 1. **User Signup**

- **Endpoint:** `POST /api/auth/signup`
- **Description:** Register a new user
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "User added successfully!!",
    "data": {
      "user_id": "uuid",
      "email_id": "john@example.com",
      "created_at": "2024-01-18T10:30:00Z"
    }
  }
  ```

### 2. **User Login**

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate an existing user and create session
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "User logged in successfully"
  }
  ```
- **Session:** JWT token stored in secure cookie (expires in 10 seconds)

### 3. **Verify Session**

- **Endpoint:** `GET /api/auth/verify`
- **Description:** Validate user session and retrieve user info
- **Response (200):**
  ```json
  {
    "data": {
      "userId": "uuid",
      "fullName": "John Doe",
      "emailId": "john@example.com",
      "createdAt": "2024-01-18T10:30:00Z",
      "updatedAt": "2024-01-18T10:30:00Z"
    }
  }
  ```

---

## Required URL Management Endpoints (To Be Implemented)

### 4. **Create Short URL**

- **Endpoint:** `POST /api/urls/create`
- **Authentication:** Required (valid session)
- **Description:** Generate a new short URL for a given long URL
- **Request Body:**
  ```json
  {
    "originalUrl": "https://www.example.com/very/long/url/path",
    "customAlias": "my-link", // Optional
    "expiresAt": "2024-12-31T23:59:59Z" // Optional
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Short URL created successfully",
    "data": {
      "urlId": "uuid",
      "shortCode": "abc123def",
      "shortUrl": "http://localhost:3000/abc123def",
      "originalUrl": "https://www.example.com/very/long/url/path",
      "customAlias": "my-link",
      "createdAt": "2024-01-18T10:30:00Z",
      "expiresAt": null
    }
  }
  ```

### 5. **Get All Short URLs (User's URLs)**

- **Endpoint:** `GET /api/urls/list`
- **Authentication:** Required (valid session)
- **Description:** Retrieve all short URLs created by the authenticated user
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `sortBy`: Sort field (createdAt, clicks) (default: createdAt)
  - `order`: asc or desc (default: desc)
- **Response (200):**
  ```json
  {
    "message": "URLs retrieved successfully",
    "data": [
      {
        "urlId": "uuid",
        "shortCode": "abc123def",
        "shortUrl": "http://localhost:3000/abc123def",
        "originalUrl": "https://example.com/long/url",
        "customAlias": "my-link",
        "totalClicks": 45,
        "createdAt": "2024-01-18T10:30:00Z",
        "updatedAt": "2024-01-18T15:45:00Z"
      },
      {
        "urlId": "uuid2",
        "shortCode": "xyz789abc",
        "shortUrl": "http://localhost:3000/xyz789abc",
        "originalUrl": "https://another-example.com",
        "customAlias": null,
        "totalClicks": 12,
        "createdAt": "2024-01-17T08:20:00Z",
        "updatedAt": "2024-01-18T09:15:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 48,
      "itemsPerPage": 10
    }
  }
  ```

### 6. **Get Single Short URL Details**

- **Endpoint:** `GET /api/urls/:urlId`
- **Authentication:** Required (valid session)
- **Description:** Retrieve details of a specific short URL
- **Path Parameters:**
  - `urlId`: The UUID of the short URL
- **Response (200):**
  ```json
  {
    "message": "URL details retrieved successfully",
    "data": {
      "urlId": "uuid",
      "shortCode": "abc123def",
      "shortUrl": "http://localhost:3000/abc123def",
      "originalUrl": "https://example.com/long/url",
      "customAlias": "my-link",
      "totalClicks": 45,
      "createdAt": "2024-01-18T10:30:00Z",
      "updatedAt": "2024-01-18T15:45:00Z"
    }
  }
  ```

### 7. **Update Short URL**

- **Endpoint:** `PATCH /api/urls/:urlId`
- **Authentication:** Required (valid session)
- **Description:** Update a short URL (custom alias, expiration, etc.)
- **Request Body:**
  ```json
  {
    "customAlias": "updated-link",
    "expiresAt": "2024-12-31T23:59:59Z"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "URL updated successfully",
    "data": {
      "urlId": "uuid",
      "customAlias": "updated-link",
      "updatedAt": "2024-01-18T16:00:00Z"
    }
  }
  ```

### 8. **Delete Short URL**

- **Endpoint:** `DELETE /api/urls/:urlId`
- **Authentication:** Required (valid session)
- **Description:** Delete a short URL and its analytics
- **Response (200):**
  ```json
  {
    "message": "URL deleted successfully"
  }
  ```

### 9. **Redirect Short URL**

- **Endpoint:** `GET /api/r/:shortCode` or `/r/:shortCode`
- **Authentication:** Not required
- **Description:** Redirect from short URL to original URL (tracks click)
- **Response:** 301/302 Redirect to original URL
- **Side Effect:** Increments click counter, logs analytics data

---

## Analytics & Insights Endpoints (To Be Implemented)

### 10. **Get URL Analytics**

- **Endpoint:** `GET /api/analytics/:urlId`
- **Authentication:** Required (valid session)
- **Description:** Get comprehensive analytics for a specific short URL
- **Response (200):**
  ```json
  {
    "message": "Analytics retrieved successfully",
    "data": {
      "urlId": "uuid",
      "shortCode": "abc123def",
      "originalUrl": "https://example.com/long/url",
      "metrics": {
        "totalClicks": 156,
        "uniqueClicks": 89,
        "clicksThisMonth": 45,
        "clicksThisWeek": 12,
        "clicksToday": 3,
        "conversionRate": 0.57
      },
      "geography": [
        {
          "country": "United States",
          "clicks": 98,
          "percentage": 62.8
        },
        {
          "country": "United Kingdom",
          "clicks": 31,
          "percentage": 19.9
        }
      ],
      "devices": [
        {
          "type": "Mobile",
          "clicks": 92,
          "percentage": 58.97
        },
        {
          "type": "Desktop",
          "clicks": 64,
          "percentage": 41.03
        }
      ],
      "referrers": [
        {
          "referrer": "direct",
          "clicks": 67,
          "percentage": 42.95
        },
        {
          "referrer": "google.com",
          "clicks": 34,
          "percentage": 21.79
        }
      ],
      "browsers": [
        {
          "browser": "Chrome",
          "clicks": 98,
          "percentage": 62.82
        }
      ],
      "operatingSystems": [
        {
          "os": "Android",
          "clicks": 78,
          "percentage": 50.0
        }
      ],
      "createdAt": "2024-01-18T10:30:00Z",
      "lastClickAt": "2024-01-18T15:45:00Z"
    }
  }
  ```

### 11. **Get Analytics Dashboard (All URLs Summary)**

- **Endpoint:** `GET /api/analytics/dashboard/summary`
- **Authentication:** Required (valid session)
- **Description:** Get overall analytics summary for all user's short URLs
- **Response (200):**
  ```json
  {
    "message": "Dashboard summary retrieved successfully",
    "data": {
      "totalUrls": 24,
      "totalClicks": 1250,
      "totalUniqueClicks": 756,
      "topPerformingUrl": {
        "shortCode": "abc123def",
        "clicks": 250,
        "shortUrl": "http://localhost:3000/abc123def"
      },
      "recentClicks": 45,
      "clicksThisWeek": 234,
      "clicksThisMonth": 567
    }
  }
  ```

### 12. **Get Click History**

- **Endpoint:** `GET /api/analytics/:urlId/clicks`
- **Authentication:** Required (valid session)
- **Description:** Get detailed click history for a specific URL
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 50)
  - `startDate`: Start date filter (ISO 8601 format)
  - `endDate`: End date filter (ISO 8601 format)
- **Response (200):**
  ```json
  {
    "message": "Click history retrieved successfully",
    "data": [
      {
        "clickId": "uuid",
        "timestamp": "2024-01-18T15:45:23Z",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "ipAddress": "192.168.1.1",
        "country": "United States",
        "city": "San Francisco",
        "browser": "Chrome",
        "operatingSystem": "Windows 10",
        "deviceType": "Desktop",
        "referrer": "google.com"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalClicks": 450
    }
  }
  ```

---

## Server Logging Endpoints (To Be Implemented)

### 13. **Get Server Logs**

- **Endpoint:** `GET /api/logs/server`
- **Authentication:** Required (Admin role or Owner)
- **Description:** Retrieve server logs with filtering options
- **Query Parameters:**
  - `level`: Log level (error, warn, info, debug) (default: all)
  - `startDate`: Start date filter (ISO 8601 format)
  - `endDate`: End date filter (ISO 8601 format)
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 50)
- **Response (200):**
  ```json
  {
    "message": "Server logs retrieved successfully",
    "data": [
      {
        "timestamp": "2024-01-18T15:45:23Z",
        "level": "info",
        "message": "User logged in successfully",
        "userId": "uuid",
        "endpoint": "/api/auth/login",
        "statusCode": 200
      },
      {
        "timestamp": "2024-01-18T15:44:10Z",
        "level": "error",
        "message": "Database connection timeout",
        "error": "TIMEOUT_ERROR",
        "statusCode": 500
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 15,
      "totalLogs": 742
    }
  }
  ```

### 14. **Get Activity Logs**

- **Endpoint:** `GET /api/logs/activity`
- **Authentication:** Required (valid session)
- **Description:** Retrieve user activity logs (URL creation, deletion, updates)
- **Query Parameters:**
  - `action`: Activity type (create, delete, update, view)
  - `startDate`: Start date filter
  - `endDate`: End date filter
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 50)
- **Response (200):**
  ```json
  {
    "message": "Activity logs retrieved successfully",
    "data": [
      {
        "logId": "uuid",
        "timestamp": "2024-01-18T15:45:00Z",
        "action": "create",
        "entityType": "url",
        "entityId": "uuid",
        "details": {
          "shortCode": "abc123def",
          "originalUrl": "https://example.com"
        },
        "ipAddress": "192.168.1.1"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalLogs": 234
    }
  }
  ```

---

## Authentication & Security Notes

- **Session Management:** Uses JWT tokens with 10-second expiration stored in secure, HTTP-only cookies
- **CORS:** Enabled for `http://localhost:5173` with credentials support
- **Password:** Hashed using Argon2 algorithm
- **Session Secret:** Stored in `.env` as `COOKIE_SECRET`
- **JWT Secret:** Stored in `.env` as `JWT_SECRET`

## Database Requirements

The following tables should be created in your Neon PostgreSQL database:

### `users.users`

- `user_id` (UUID, Primary Key)
- `full_name` (VARCHAR)
- `email_id` (VARCHAR, Unique)
- `password` (VARCHAR)
- `created_at` (TIMESTAMP)
- `last_updated_at` (TIMESTAMP)

### `urls.short_urls` (To Be Created)

- `url_id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.users)
- `short_code` (VARCHAR, Unique)
- `original_url` (TEXT)
- `custom_alias` (VARCHAR, Unique, Nullable)
- `expires_at` (TIMESTAMP, Nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `urls.url_analytics` (To Be Created)

- `click_id` (UUID, Primary Key)
- `url_id` (UUID, Foreign Key → urls.short_urls)
- `clicked_at` (TIMESTAMP)
- `user_agent` (TEXT)
- `ip_address` (VARCHAR)
- `country` (VARCHAR)
- `city` (VARCHAR)
- `browser` (VARCHAR)
- `operating_system` (VARCHAR)
- `device_type` (VARCHAR)
- `referrer` (VARCHAR, Nullable)

### `logs.activity_logs` (To Be Created)

- `log_id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.users, Nullable)
- `action` (VARCHAR) - create, update, delete, view
- `entity_type` (VARCHAR) - url, user, etc.
- `entity_id` (UUID)
- `details` (JSONB)
- `ip_address` (VARCHAR)
- `timestamp` (TIMESTAMP)

### `logs.server_logs` (To Be Created)

- `log_id` (UUID, Primary Key)
- `timestamp` (TIMESTAMP)
- `level` (VARCHAR) - error, warn, info, debug
- `message` (TEXT)
- `user_id` (UUID, Foreign Key → users.users, Nullable)
- `endpoint` (VARCHAR, Nullable)
- `status_code` (INTEGER, Nullable)
- `error_details` (JSONB, Nullable)

---

## Required Middleware

Middleware functions that should be implemented to support the API endpoints:

### 1. **Authentication Middleware** (`authMiddleware`)

- **Purpose:** Verify user session validity before allowing access to protected endpoints
- **Applied To:** All URL management, analytics, and activity log endpoints
- **Functionality:**
  - Extract JWT token from secure cookie (`session.u_s_us_sess`)
  - Verify token signature using `JWT_SECRET`
  - Check token expiration
  - Extract and attach `user_id` and `email_id` to request object (`req.user`)
  - Return 401 error if token is missing, invalid, or expired
- **Error Response:**
  ```json
  {
    "status": 401,
    "error": "No active session" or "Invalid/Expired session"
  }
  ```

### 2. **Authorization Middleware** (`authorizationMiddleware`)

- **Purpose:** Verify that the user has ownership/permission to access specific resources
- **Applied To:** Endpoints like `GET /api/urls/:urlId`, `PATCH /api/urls/:urlId`, `DELETE /api/urls/:urlId`, `GET /api/analytics/:urlId`
- **Functionality:**
  - Check if the short URL belongs to the authenticated user
  - Query database to verify `user_id` matches the owner of the URL
  - Return 403 Forbidden if user doesn't own the resource
- **Error Response:**
  ```json
  {
    "status": 403,
    "error": "You don't have permission to access this resource"
  }
  ```

### 3. **Input Validation Middleware** (`validateInputMiddleware`)

- **Purpose:** Validate and sanitize incoming request data before processing
- **Applied To:** All POST and PATCH endpoints
- **Functionality:**
  - Validate required fields based on endpoint (e.g., `originalUrl`, `customAlias`)
  - Validate data types (URL format, string length, date format)
  - Sanitize inputs to prevent SQL injection and XSS attacks
  - Trim and normalize string inputs
  - Return 400 Bad Request for invalid data
- **Validation Rules:**
  - `originalUrl`: Valid URL format, max 2048 characters, must start with http/https
  - `customAlias`: Alphanumeric with hyphens only, max 50 characters, must be unique
  - `expiresAt`: Valid ISO 8601 date, must be in future
  - `page`: Positive integer, default 1
  - `limit`: Positive integer between 1-100, default 10
- **Error Response:**
  ```json
  {
    "status": 400,
    "error": "Invalid input",
    "details": {
      "originalUrl": "Must be a valid URL",
      "customAlias": "Can only contain letters, numbers, and hyphens"
    }
  }
  ```

### 4. **Rate Limiting Middleware** (`rateLimitMiddleware`)

- **Purpose:** Prevent abuse by limiting number of requests from a user
- **Applied To:** All endpoints
- **Functionality:**
  - Track requests per user (identified by `user_id`) or IP address
  - Limit authenticated users to 100 requests per 15 minutes
  - Limit unauthenticated users (for redirect endpoint) to 1000 requests per hour per IP
  - Return 429 Too Many Requests when limit exceeded
  - Include `Retry-After` header in response
- **Error Response:**
  ```json
  {
    "status": 429,
    "error": "Too many requests. Please try again later.",
    "retryAfter": 300
  }
  ```

### 5. **Activity Logging Middleware** (`activityLoggerMiddleware`)

- **Purpose:** Log all user actions for audit trail and analytics
- **Applied To:** All endpoints except `GET /api/logs/*`
- **Functionality:**
  - Capture request details: method, endpoint, user_id, timestamp
  - Record request body (sanitized to exclude passwords)
  - Log response status code and any errors
  - Store action type: `create`, `read`, `update`, `delete`
  - Include IP address from `req.ip` or X-Forwarded-For header
  - Asynchronously insert into `logs.activity_logs` table
  - Should not block request processing

### 6. **Server Logging Middleware** (`serverLoggerMiddleware`)

- **Purpose:** Log all server events and errors for monitoring
- **Applied To:** All routes globally
- **Functionality:**
  - Log incoming requests with timestamp and endpoint
  - Log all errors with stack trace, user context, and endpoint
  - Capture HTTP status codes and response times
  - Log database errors separately with query information
  - Determine log level: `info` for success, `warn` for 4xx errors, `error` for 5xx errors
  - Asynchronously write to `logs.server_logs` table
- **Log Levels:**
  - `debug`: Detailed information for debugging
  - `info`: General information about request flow
  - `warn`: Warning conditions (4xx client errors)
  - `error`: Error conditions (5xx server errors)

### 7. **Click Tracking Middleware** (`clickTrackerMiddleware`)

- **Purpose:** Track and record analytics when short URLs are accessed
- **Applied To:** Redirect endpoint `/api/r/:shortCode` or `/r/:shortCode`
- **Functionality:**
  - Parse user agent to extract browser, OS, device type
  - Determine device type: Desktop, Mobile, Tablet based on user agent
  - Extract IP address from request headers
  - Use IP geolocation service to determine country and city
  - Extract referrer from request headers
  - Increment click counter for the short URL
  - Insert detailed click record into `urls.url_analytics` table
  - Should be fast (cache geolocation results) to minimize redirect latency
- **Data Captured:**
  - Timestamp, User Agent, IP Address
  - Browser (Chrome, Firefox, Safari, etc.)
  - Operating System (Windows, macOS, Linux, iOS, Android)
  - Device Type (Desktop, Mobile, Tablet)
  - Country, City (from IP geolocation)
  - Referrer (if available)

### 8. **CORS & Security Middleware** (`securityMiddleware`)

- **Purpose:** Enforce security headers and cross-origin policies
- **Applied To:** All endpoints globally
- **Functionality:**
  - Already implemented: CORS headers for `http://localhost:5173`
  - Add security headers:
    - `X-Content-Type-Options: nosniff`
    - `X-Frame-Options: DENY`
    - `X-XSS-Protection: 1; mode=block`
    - `Strict-Transport-Security: max-age=31536000`
  - Validate Content-Type for POST/PATCH requests
  - Enforce HTTPS in production
  - Sanitize response headers to prevent information leakage

### 9. **Error Handling Middleware** (`errorHandlerMiddleware`)

- **Purpose:** Centralized error handling and standardized error responses
- **Applied To:** Applied globally (already exists in server.js)
- **Functionality:**
  - Catch all unhandled errors
  - Format error responses consistently
  - Convert database errors to user-friendly messages
  - Include error details only in development mode
  - Log errors for monitoring
  - Return appropriate HTTP status codes
  - Include request ID for error tracking
- **Standard Error Response:**
  ```json
  {
    "status": 500,
    "error": "Internal Server Error",
    "requestId": "uuid"
  }
  ```

### 10. **Pagination Validation Middleware** (`paginationMiddleware`)

- **Purpose:** Validate and normalize pagination parameters
- **Applied To:** List endpoints (`GET /api/urls/list`, `GET /api/analytics/dashboard/summary`, etc.)
- **Functionality:**
  - Extract `page` and `limit` from query parameters
  - Validate they are positive integers
  - Set defaults: `page=1`, `limit=10`
  - Enforce maximum limit (e.g., max 100 items per page)
  - Calculate offset for database queries
  - Attach to request object: `req.pagination = { page, limit, offset }`

### 11. **Resource Ownership Middleware** (`resourceOwnershipMiddleware`)

- **Purpose:** Verify ownership of resources before allowing modifications
- **Applied To:** `DELETE /api/urls/:urlId`, `PATCH /api/urls/:urlId`, `GET /api/analytics/:urlId`
- **Functionality:**
  - Extract resource ID from URL parameters
  - Query database to fetch resource and verify owner
  - Compare resource owner's `user_id` with authenticated user's `user_id`
  - Return 404 if resource not found or 403 if user doesn't own it
  - Attach resource data to request object for use in handlers
- **Error Response:**
  ```json
  {
    "status": 404,
    "error": "Resource not found"
  }
  ```

---

## Middleware Application Flow

```
Request comes in
    ↓
[CORS & Security Middleware]
    ↓
[Server Logger Middleware]
    ↓
[Rate Limit Middleware]
    ↓
[Input Validation Middleware] (if POST/PATCH)
    ↓
[Authentication Middleware] (if protected endpoint)
    ↓
[Authorization Middleware] (if resource-specific)
    ↓
[Resource Ownership Middleware] (if modifying/viewing specific resource)
    ↓
[Pagination Middleware] (if list endpoint)
    ↓
[Click Tracker Middleware] (if redirect endpoint)
    ↓
[Route Handler]
    ↓
[Activity Logger Middleware] (async, non-blocking)
    ↓
Response sent to client
```

---

## Implementation Summary

### Current Implementation Status

✅ Authentication endpoints (signup, login, verify)

### To Be Implemented

- URL Management (create, list, get, update, delete)
- URL Redirect functionality with click tracking
- Analytics endpoints (URL analytics, dashboard, click history)
- Server logging system
- Activity logging system
- Database tables for URLs and analytics
- All 11 middleware functions
- Analytics aggregation service

---

## API Usage Flow

1. **User Registration:** `POST /api/auth/signup` → User account created
2. **User Login:** `POST /api/auth/login` → Session established (JWT token in cookie)
3. **Verify Session:** `GET /api/auth/verify` → Confirm valid session
4. **Create Short URL:** `POST /api/urls/create` → Generate short URL
5. **View User's URLs:** `GET /api/urls/list` → See all created short URLs
6. **Get URL Analytics:** `GET /api/analytics/:urlId` → View metrics and insights
7. **Access Logs:** `GET /api/logs/activity` → View activity history
8. **Monitor Server:** `GET /api/logs/server` → Check server health and errors
