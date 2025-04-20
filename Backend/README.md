# API Documentation

## Endpoints

- [POST /users/register](#usersregister)
- [POST /users/login](#userslogin)
- [POST /users/profile](#usersprofile)
- [POST /users/logout](#userslogout)

---

## Endpoint: `/users/register`

### **Description**
The `/users/register` endpoint allows a new user to register an account. The endpoint validates the request data, hashes the password, creates a user in the database, and returns a JSON Web Token (JWT) along with the created user's details.

### **HTTP Method**
`POST`

### **Request URL**
```
http://localhost:4000/users/register
```
*Replace with your server’s domain and port if different.*

### **Headers**
| Key           | Value              |
|---------------|--------------------|
| Content-Type  | application/json   |

### **Request Body**
The request body must be a JSON object with the following structure:

| Field                  | Type   | Required | Description                                                      |
|------------------------|--------|----------|------------------------------------------------------------------|
| `fullName.firstName`   | string | Yes      | The user's first name. Must be at least 3 characters long.       |
| `fullName.lastName`    | string | No       | The user's last name. If provided, must be at least 3 characters long. |
| `email`                | string | Yes      | A valid email address.                                           |
| `password`             | string | Yes      | The account password. Must be at least 6 characters long.        |

#### **Example Request Body**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### **Response**

#### **Success Response**
- **Status Code**: `201 Created`
- **Response Body**:
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "60c72b2f9b1e8e3a50c8b456",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### **Error Responses**
- **422 Unprocessable Entity**: Input data did not meet validation requirements.
- **409 Conflict**: The provided email address already exists.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## Endpoint: `/users/login`

### **Description**
The `/users/login` endpoint allows an existing user to authenticate. It verifies the provided email and password, and, if valid, returns a JSON Web Token (JWT) along with the user's details.

### **HTTP Method**
`POST`

### **Request URL**
```
http://localhost:4000/users/login
```
*Replace with your server’s domain and port if different.*

### **Headers**
| Key           | Value              |
|---------------|--------------------|
| Content-Type  | application/json   |

### **Request Body**
The request body must be a JSON object with the following structure:

| Field      | Type   | Required | Description                 |
|------------|--------|----------|-----------------------------|
| `email`    | string | Yes      | A valid email address.      |
| `password` | string | Yes      | The user's password.        |

#### **Example Request Body**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### **Response**

#### **Success Response**
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "60c72b2f9b1e8e3a50c8b456",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### **Error Responses**
- **422 Unprocessable Entity**: Input data did not meet validation requirements.
- **401 Unauthorized**: Invalid email or password.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## Endpoint: `/users/profile`

### **Description**
The `/users/profile` endpoint retrieves the authenticated user's profile information. This endpoint requires authentication via a JWT token.

### **HTTP Method**
`GET`

### **Request URL**
```
http://localhost:4000/users/profile
```
*Replace with your server's domain and port if different.*

### **Headers**
| Key           | Value                          |
|---------------|--------------------------------|
| Content-Type  | application/json               |
| Authorization | Bearer <JWT_TOKEN>             |

### **Response**

#### **Success Response**
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "user": {
    "_id": "60c72b2f9b1e8e3a50c8b456",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### **Error Responses**
- **401 Unauthorized**: Invalid or missing authentication token.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## Endpoint: `/users/logout`

### **Description**
The `/users/logout` endpoint logs out the currently authenticated user by invalidating their JWT token. The token is added to a blacklist to prevent its further use. This endpoint requires authentication.

### **HTTP Method**
`GET`

### **Request URL**
```
http://localhost:4000/users/logout
```
*Replace with your server's domain and port if different.*

### **Headers**
| Key           | Value                          |
|---------------|--------------------------------|
| Content-Type  | application/json               |
| Authorization | Bearer <JWT_TOKEN>             |

### **Response**

#### **Success Response**
- **Status Code**: `200 OK`
- **Response Body**:
```json
{
  "message": "Logged out successfully"
}
```

---


#### **Error Responses**
- **401 Unauthorized**: Invalid or missing authentication token.
- **500 Internal Server Error**: An unexpected error occurred on the server.


### **Testing the Endpoints**

#### **Example cURL for `/users/register`**
```bash
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### **Example cURL for `/users/login`**
```bash
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### **Example cURL for `/users/profile`**
```bash
curl -X GET http://localhost:4000/users/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### **Example cURL for `/users/logout`**
```bash
curl -X GET http://localhost:4000/users/logout \
-H "Authorization: Bearer <JWT_TOKEN>"
```

---

### **Notes**
- **Data Security**: Passwords are hashed using bcrypt before storage.
- **Token Generation**: JWT tokens are generated using a secret defined in the environment variables.
- **Validation**: Both endpoints validate the request data using express-validator.
- **Error Handling**: The API returns appropriate status codes and error messages for validation errors, authentication failures, and server errors.

---

### **Dependencies**
- **express-validator:** Used for validating the incoming request data.
- **bcrypt:** Used for hashing passwords.
- **jsonwebtoken:** Used for generating and verifying JWT tokens.
- **cookie-parser:** is used to read and parse cookies from incoming HTTP requests.

---

*This documentation is part of the Velora Online Ride Booking App backend services.*
