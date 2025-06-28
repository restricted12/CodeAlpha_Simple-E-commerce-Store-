# Authentication Guide for API Testing

## 🔐 Getting Started with Authentication

To test protected routes (like creating, updating, or deleting products), you need to first get a JWT token by registering or logging in.

## Step 1: Register a New User

**Endpoint:** `POST /api/users/createaccount`

**Request:**
```bash
curl -X POST http://localhost:5000/api/users/createaccount \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response (201):**
```json
{
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Test User",
    "email": "test@example.com",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGY3YjNiM2IzYjNiM2IzYjNiM2IzYjMiLCJpYXQiOjE2MjY3NzQ4MDAsImV4cCI6MTYyNjc3ODQwMH0.example_token_here"
}
```

## Step 2: Login (Alternative to Registration)

**Endpoint:** `POST /api/users/login`

**Request:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response (200):**
```json
{
  "user": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Test User",
    "email": "test@example.com",
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGY3YjNiM2IzYjNiM2IzYjNiM2IzYjMiLCJpYXQiOjE2MjY3NzQ4MDAsImV4cCI6MTYyNjc3ODQwMH0.example_token_here"
}
```

## Step 3: Use the Token for Protected Routes

Copy the `token` value from the response and use it in the `Authorization` header.

### Example: Create a Product

```bash
curl -X POST http://localhost:5000/api/products/add-product \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGY3YjNiM2IzYjNiM2IzYjNiM2IzYjMiLCJpYXQiOjE2MjY3NzQ4MDAsImV4cCI6MTYyNjc3ODQwMH0.example_token_here" \
  -d '{
    "name": "Test Product",
    "description": "A test product for API testing",
    "price": 29.99,
    "category": "Test Category",
    "image": "https://example.com/test.jpg",
    "stock": 10
  }'
```

## 🔧 Quick Test Script

Here's a complete test script that registers a user and creates a product:

```bash
#!/bin/bash

# Step 1: Register a user and get token
echo "Registering user..."
RESPONSE=$(curl -s -X POST http://localhost:5000/api/users/createaccount \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }')

# Extract token from response (you might need to adjust this based on your JSON parsing)
TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

echo "Token received: $TOKEN"

# Step 2: Create a product using the token
echo "Creating product..."
curl -X POST http://localhost:5000/api/products/add-product \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Product",
    "description": "A test product created with authentication",
    "price": 29.99,
    "category": "Test Category",
    "image": "https://example.com/test.jpg",
    "stock": 10
  }'
```

## 📝 Test Users for Quick Testing

You can use these pre-defined test users:

### User 1
```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "password": "alice123"
}
```

### User 2
```json
{
  "name": "Bob Smith",
  "email": "bob.smith@example.com",
  "password": "bob456"
}
```

### User 3
```json
{
  "name": "Carol Wilson",
  "email": "carol.wilson@example.com",
  "password": "carol789"
}
```

## 🚨 Common Authentication Errors

### 1. "Access denied. No token provided."
**Cause:** Missing `Authorization` header
**Solution:** Add `Authorization: Bearer <your_token>` header

### 2. "Invalid token."
**Cause:** Token is expired or malformed
**Solution:** Get a new token by logging in again

### 3. "User not found"
**Cause:** User doesn't exist
**Solution:** Register the user first

### 4. "Invalid email or password"
**Cause:** Wrong credentials
**Solution:** Check email and password, or register a new user

## 🔍 Testing Protected vs Public Routes

### Public Routes (No Token Required):
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Protected Routes (Token Required):
- `POST /api/products/add-product` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 💡 Tips for Testing

1. **Save your token:** Store the token in a variable or file for reuse
2. **Check token expiration:** JWT tokens expire, so you may need to re-authenticate
3. **Use different users:** Test with multiple user accounts
4. **Test error cases:** Try invalid tokens, expired tokens, etc.

## 🛠️ Using Postman or Similar Tools

1. **Register/Login:** Send POST request to get token
2. **Set Authorization:** In Headers tab, add:
   - Key: `Authorization`
   - Value: `Bearer <your_token>`
3. **Test Protected Routes:** Now you can access protected endpoints

## 🔄 Complete Testing Workflow

1. Register a user → Get token
2. Test public routes (GET products) → Should work without token
3. Test protected routes (POST/PUT/DELETE) → Should work with token
4. Test without token → Should get "Access denied" error
5. Test with invalid token → Should get "Invalid token" error 