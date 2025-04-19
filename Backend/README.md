# API Documentation

## Endpoint: `/users/register`

### **Description**
The `/users/register` endpoint allows a new user to register an account. The endpoint validates the request data, hashes the password, creates a user in the database, and returns a JSON Web Token (JWT) along with the created user’s details.

---

### **HTTP Method**
`POST`

---

### **Request URL**
```
http://localhost:4000/users/register
```


---

### **Headers**
| Key           | Value                |
|---------------|----------------------|
| Content-Type  | application/json     |

---

### **Request Body**
The request body must be a JSON object with the following structure:

| Field                  | Type     | Required | Description                                                       |
|------------------------|----------|----------|-------------------------------------------------------------------|
| `fullName.firstName`   | string   | Yes      | The first name of the user. Must be at least 3 characters long.   |
| `fullName.lastName`    | string   | No       | The last name of the user. If provided, must be at least 3 characters long. |
| `email`                | string   | Yes      | The user's email address. Must be a valid email format.           |
| `password`             | string   | Yes      | The password for the account. Must be at least 6 characters long. |

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

---

### **Response**

#### **Success Response**
- **Status Code**: `201 Created`
- **Description**: User registration was successful.
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

---

### **Notes**
- **Data Security**: Passwords are hashed using bcrypt before being stored.
- **Token Generation**: A JWT is generated for the user using a secret defined in the environment variables.
- **Error Handling**: Ensure proper handling of validation, duplicate entries, and unexpected errors as defined in the responses above.

---

### **Dependencies**
- **express-validator:** Used for validating the incoming request data.
- **bcrypt:** Used for hashing passwords.
- **jsonwebtoken:** Used for generating and verifying JWT tokens.

---

*This documentation is part of the Velora Online Ride Booking App backend services.*
