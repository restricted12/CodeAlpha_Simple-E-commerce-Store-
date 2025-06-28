# User API Testing Guide

## Base URL
```
http://localhost:5000/api/users
```

## 1. User Registration
**Endpoint:** `POST /api/users/createaccount`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 2. User Login
**Endpoint:** `POST /api/users/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 3. Get Current User Profile
**Endpoint:** `GET /api/users/profile`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Expected Response (200):**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2023-07-20T10:30:00.000Z",
  "updatedAt": "2023-07-20T10:30:00.000Z"
}
```

## 4. Get All Users (Admin Only)
**Endpoint:** `GET /api/users`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Expected Response (200):**
```json
[
  {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  },
  {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b4",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "createdAt": "2023-07-20T11:30:00.000Z",
    "updatedAt": "2023-07-20T11:30:00.000Z"
  }
]
```

## 5. Get User by ID
**Endpoint:** `GET /api/users/:id`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Expected Response (200):**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2023-07-20T10:30:00.000Z",
  "updatedAt": "2023-07-20T10:30:00.000Z"
}
```

## 6. Update User
**Endpoint:** `PUT /api/users/:id`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "name": "John Updated Doe",
  "email": "john.updated@example.com"
}
```

**Expected Response (200):**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "John Updated Doe",
  "email": "john.updated@example.com",
  "createdAt": "2023-07-20T10:30:00.000Z",
  "updatedAt": "2023-07-20T12:30:00.000Z"
}
```

## 7. Delete User
**Endpoint:** `DELETE /api/users/:id`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Expected Response (200):**
```json
{
  "message": "User deleted"
}
```

## Test Users for Development

### Test User 1
```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "password": "alice123"
}
```

### Test User 2
```json
{
  "name": "Bob Smith",
  "email": "bob.smith@example.com",
  "password": "bob456"
}
```

### Test User 3
```json
{
  "name": "Carol Wilson",
  "email": "carol.wilson@example.com",
  "password": "carol789"
}
```

### Admin User
```json
{
  "name": "Admin User",
  "email": "admin@store.com",
  "password": "admin123"
}
```

## Error Responses

### 400 Bad Request (Missing Fields)
```json
{
  "error": "Email and password are required"
}
```

### 401 Unauthorized (Invalid Credentials)
```json
{
  "error": "Invalid email or password"
}
```

### 401 Unauthorized (No Token)
```json
{
  "error": "Access denied. No token provided."
}
```

### 401 Unauthorized (Invalid Token)
```json
{
  "error": "Invalid token."
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

## Testing with cURL

### Register a new user:
```bash
curl -X POST http://localhost:5000/api/users/createaccount \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get profile (with token):
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Environment Variables Required

Make sure your `.env` file contains:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
``` 