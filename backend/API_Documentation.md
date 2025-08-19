# API Documentation for Tienda Ropa Backend

This document provides detailed instructions for testing the API endpoints using Postman.

## Base URL
```
http://localhost:3000
```

## Authentication
All endpoints (except login and signup) require a valid token in the `Authorization` header.

### Example Header
```
Authorization: Bearer <your_token>
```

---

## Endpoints

### 1. User Authentication

#### Register
**POST** `/api/auth/register`
- **Description**: Register a new user.
- **Body** (JSON):
  ```json
  {
    "nombre": "John",
    "apellido": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `201 Created`: User registered successfully.

#### Login
**POST** `/api/auth/login`
- **Description**: Authenticate a user and get a token.
- **Body** (JSON):
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK`: Returns a token.

---

### 2. Products

#### Get All Products
**GET** `/products`
- **Description**: Retrieve all products.
- **Response**:
  - `200 OK`: List of products.

#### Get Product by ID
**GET** `/products/:id`
- **Description**: Retrieve a product by its ID.
- **Response**:
  - `200 OK`: Product details.
  - `404 Not Found`: Product not found.

#### Create Product
**POST** `/products`
- **Description**: Add a new product (Admin only).
- **Body** (JSON):
  ```json
  {
    "nombre_producto": "T-Shirt",
    "precio_unitario": 20,
    "descripcion": "A comfortable t-shirt",
    "categoria": "Clothing",
    "talla": "M",
    "color": "Blue",
    "stock": 100
  }
  ```
- **Response**:
  - `201 Created`: Product created successfully.

---

### 3. Orders

#### Get All Orders
**GET** `/orders`
- **Description**: Retrieve all orders for the logged-in user.
- **Response**:
  - `200 OK`: List of orders.

#### Get Order by ID
**GET** `/orders/:id`
- **Description**: Retrieve an order by its ID.
- **Response**:
  - `200 OK`: Order details.
  - `404 Not Found`: Order not found.

#### Create Order
**POST** `/orders`
- **Description**: Create a new order.
- **Body** (JSON):
  ```json
  {
    "items": [
      {
        "id_producto": "123456",
        "nombre_producto": "T-Shirt",
        "precio_unitario": 20,
        "cantidad": 2,
        "subtotal": 40
      }
    ],
    "precio_total": 40,
    "direccion_envio": "123 Main St, City, Country"
  }
  ```
- **Response**:
  - `201 Created`: Order created successfully.

#### Update Order
**PUT** `/orders/:id`
- **Description**: Update an existing order.
- **Body** (JSON):
  ```json
  {
    "estado": "enviado"
  }
  ```
- **Response**:
  - `200 OK`: Order updated successfully.
  - `404 Not Found`: Order not found.

#### Delete Order
**DELETE** `/orders/:id`
- **Description**: Delete an order by its ID.
- **Response**:
  - `200 OK`: Order deleted successfully.
  - `404 Not Found`: Order not found.

---

### 4. Purchases

#### Get All Purchases
**GET** `/purchases`
- **Description**: Retrieve all purchases for the logged-in user.
- **Response**:
  - `200 OK`: List of purchases.

#### Get Purchase by ID
**GET** `/purchases/:id`
- **Description**: Retrieve a purchase by its ID.
- **Response**:
  - `200 OK`: Purchase details.
  - `404 Not Found`: Purchase not found.

---

## Notes
- Replace `<your_token>` with the token received after login.
- Ensure the server is running on the specified port before testing the endpoints.
