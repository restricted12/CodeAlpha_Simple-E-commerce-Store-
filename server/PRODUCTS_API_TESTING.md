# Products API Testing Guide

## Base URL
```
http://localhost:5000/api/products
```

## 1. Get All Products
**Endpoint:** `GET /api/products`

**Expected Response (200):**
```json
[
  {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    "price": 999.99,
    "category": "Electronics",
    "image": "https://example.com/images/iphone15pro.jpg",
    "stock": 50,
    "createdAt": "2023-07-20T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  }
]
```

## 2. Get Product by ID
**Endpoint:** `GET /api/products/:id`

**Expected Response (200):**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
  "price": 999.99,
  "category": "Electronics",
  "image": "https://example.com/images/iphone15pro.jpg",
  "stock": 50,
  "createdAt": "2023-07-20T10:30:00.000Z",
  "updatedAt": "2023-07-20T10:30:00.000Z"
}
```

**Expected Response (404):**
```json
{
  "error": "Product not found"
}
```

## 3. Create Product (Protected Route)
**Endpoint:** `POST /api/products/add-product`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

### Valid Product Creation Examples:

**Full Product:**
```json
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
  "price": 999.99,
  "category": "Electronics",
  "image": "https://example.com/images/iphone15pro.jpg",
  "stock": 50
}
```

**Minimal Product:**
```json
{
  "name": "Basic Product",
  "price": 10.00,
  "stock": 1
}
```

**Product with Optional Fields:**
```json
{
  "name": "Product with Description",
  "description": "This product has a description but no category or image",
  "price": 25.50,
  "stock": 10
}
```

**Expected Response (201):**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
  "price": 999.99,
  "category": "Electronics",
  "image": "https://example.com/images/iphone15pro.jpg",
  "stock": 50,
  "createdAt": "2023-07-20T10:30:00.000Z",
  "updatedAt": "2023-07-20T10:30:00.000Z"
}
```

### Invalid Product Creation Examples:

**Missing Required Fields:**
```json
{
  "description": "Missing name and price",
  "category": "Electronics",
  "stock": 10
}
```

**Negative Values:**
```json
{
  "name": "Negative Price Product",
  "description": "Product with negative price",
  "price": -10.00,
  "stock": 10
}
```

**Invalid Data Types:**
```json
{
  "name": "Invalid Price Type",
  "description": "Price as string instead of number",
  "price": "fifty dollars",
  "stock": 10
}
```

**Expected Response (400):**
```json
{
  "error": "Product validation failed: name: Path `name` is required."
}
```

## 4. Update Product (Protected Route)
**Endpoint:** `PUT /api/products/:id`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

### Update Examples:

**Full Update:**
```json
{
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 75.00,
  "category": "Updated Category",
  "image": "https://example.com/updated-image.jpg",
  "stock": 25
}
```

**Partial Update - Name Only:**
```json
{
  "name": "Partial Update - Name Only"
}
```

**Partial Update - Price and Stock:**
```json
{
  "price": 99.99,
  "stock": 50
}
```

**Expected Response (200):**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 75.00,
  "category": "Updated Category",
  "image": "https://example.com/updated-image.jpg",
  "stock": 25,
  "createdAt": "2023-07-20T10:30:00.000Z",
  "updatedAt": "2023-07-20T12:30:00.000Z"
}
```

**Expected Response (404):**
```json
{
  "error": "Product not found"
}
```

## 5. Delete Product (Protected Route)
**Endpoint:** `DELETE /api/products/:id`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Expected Response (200):**
```json
{
  "message": "Product deleted"
}
```

**Expected Response (404):**
```json
{
  "error": "Product not found"
}
```

## Test Data Categories

### Valid Products for Testing:
```json
[
  {
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    "price": 999.99,
    "category": "Electronics",
    "image": "https://example.com/images/iphone15pro.jpg",
    "stock": 50
  },
  {
    "name": "Samsung Galaxy S24",
    "description": "Android flagship with AI features and excellent camera performance",
    "price": 899.99,
    "category": "Electronics",
    "image": "https://example.com/images/galaxys24.jpg",
    "stock": 35
  },
  {
    "name": "MacBook Air M3",
    "description": "Lightweight laptop with Apple M3 chip, perfect for productivity",
    "price": 1199.99,
    "category": "Computers",
    "image": "https://example.com/images/macbook-air-m3.jpg",
    "stock": 25
  }
]
```

### Edge Case Products:
```json
[
  {
    "name": "Very Long Product Name That Exceeds Normal Length Expectations",
    "description": "A product with an extremely long name to test string handling",
    "price": 999999.99,
    "category": "Test Category",
    "image": "https://example.com/very-long-image-url-that-might-cause-issues.jpg",
    "stock": 999999
  },
  {
    "name": "Product with Special Characters: !@#$%^&*()",
    "description": "Description with special characters: áéíóú ñ ü ß",
    "price": 0.01,
    "category": "Special & Characters",
    "image": "https://example.com/special-chars.jpg",
    "stock": 1
  }
]
```

### Invalid Products for Testing Validation:
```json
[
  {
    "description": "Missing name and price",
    "category": "Electronics",
    "stock": 10
  },
  {
    "name": "Negative Price",
    "description": "Product with negative price",
    "price": -10.00,
    "stock": 10
  },
  {
    "name": "Invalid Price Type",
    "description": "Price as string instead of number",
    "price": "fifty dollars",
    "stock": 10
  }
]
```

## Testing with cURL

### Get all products:
```bash
curl -X GET http://localhost:5000/api/products
```

### Get product by ID:
```bash
curl -X GET http://localhost:5000/api/products/60f7b3b3b3b3b3b3b3b3b3b3
```

### Create a new product:
```bash
curl -X POST http://localhost:5000/api/products/add-product \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "name": "Test Product",
    "description": "A test product for API testing",
    "price": 29.99,
    "category": "Test Category",
    "image": "https://example.com/test.jpg",
    "stock": 10
  }'
```

### Update a product:
```bash
curl -X PUT http://localhost:5000/api/products/60f7b3b3b3b3b3b3b3b3b3b3 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "name": "Updated Test Product",
    "price": 39.99,
    "stock": 15
  }'
```

### Delete a product:
```bash
curl -X DELETE http://localhost:5000/api/products/60f7b3b3b3b3b3b3b3b3b3b3 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Error Responses

### 400 Bad Request (Validation Error)
```json
{
  "error": "Product validation failed: name: Path `name` is required."
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
  "error": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```

## Database Schema Reference

The Product model has the following fields:

- **name** (String, required): Product name
- **description** (String, optional): Product description (default: '')
- **price** (Number, required, min: 0): Product price
- **category** (String, optional): Product category (default: '')
- **image** (String, optional): Product image URL (default: '')
- **stock** (Number, required, min: 0): Available stock quantity
- **createdAt** (Date, auto-generated): Creation timestamp
- **updatedAt** (Date, auto-generated): Last update timestamp

## Testing Checklist

- [ ] Create product with all fields
- [ ] Create product with minimal required fields only
- [ ] Create product with optional fields
- [ ] Test validation for missing required fields
- [ ] Test validation for negative values
- [ ] Test validation for invalid data types
- [ ] Test edge cases (very long strings, special characters)
- [ ] Test authentication for protected routes
- [ ] Test authorization with valid/invalid tokens
- [ ] Test product retrieval (all products, single product)
- [ ] Test product updates (full and partial)
- [ ] Test product deletion
- [ ] Test error handling for non-existent products 