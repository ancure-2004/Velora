# API Documentation

## Endpoints

### User Endpoints
- [POST /users/register](#usersRegister)
- [POST /users/login](#usersLogin) 
- [GET /users/profile](#usersProfile)
- [GET /users/logout](#usersLogout)

### Captain Endpoints
- [POST /captains/register](#captainsRegister)
- [POST /captains/login](#captainsLogin)
- [GET /captains/profile](#captainsProfile) 
- [GET /captains/logout](#captainsLogout)

### Ride Endpoints
- [POST /rides/create](#ridesCreate)

### Maps Endpoints
- [GET /maps/get-coordinates](#mapsGetCoordinates)
- [GET /maps/get-distance-time](#mapsGetDistanceTime)
- [GET /maps/get-suggestions](#mapsGetSuggestions)

---

# usersRegister
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

# usersLogin
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

# usersProfile
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

# usersLogout
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

#### **Error Responses**
- **401 Unauthorized**: Invalid or missing authentication token.
- **500 Internal Server Error**: An unexpected error occurred on the server.

---

## Captain Endpoints

# captainsRegister
### Endpoint: `/captains/register`

#### Description
The `/captains/register` endpoint allows a new captain to create an account. It validates the request data, hashes the password, stores the captain in the database, and returns a JSON Web Token (JWT) along with the created captain's details.

#### HTTP Method
`POST`

#### Request URL
```
http://localhost:4000/captains/register
```
*Replace with your server’s domain and port if different.*

#### Headers
| Key           | Value            |
|---------------|------------------|
| Content-Type  | application/json |

#### Request Body
The request body must be a JSON object with the following structure:

| Field                           | Type   | Required | Description                                                              |
|---------------------------------|--------|----------|--------------------------------------------------------------------------|
| `fullName.firstName`            | string | Yes      | Captain’s first name. Must be at least 3 characters long.                |
| `fullName.lastName`             | string | No       | Captain’s last name. If provided, must be at least 3 characters long.      |
| `email`                         | string | Yes      | A valid email address.                                                   |
| `password`                      | string | Yes      | The account password. Must be at least 6 characters long.                |
| `vehicle.color`                 | string | Yes      | Color of the vehicle. Must be at least 3 characters long.                |
| `vehicle.plate`                 | string | Yes      | Vehicle plate number. Must be at least 3 characters long.                |
| `vehicle.capacity`              | number | Yes      | The seating capacity of the vehicle. Must be at least 1.                 |
| `vehicle.vehicleType`           | string | Yes      | The type of vehicle. Should be one of: `car`, `bike`, or `auto`.           |

##### Example Request Body
```json
{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response

##### Success Response
- **Status Code:** `201 Created`
- **Response Body:**
```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

##### Error Responses
- **422 Unprocessable Entity:** Input data did not meet validation requirements.
- **409 Conflict:** The provided email address is already registered.
- **500 Internal Server Error:** An unexpected error occurred on the server.

---

# captainsLogin
### Endpoint: `/captains/login`

#### Description
The `/captains/login` endpoint allows an existing captain to authenticate. It verifies the provided email and password, and if valid, returns a JSON Web Token (JWT) along with the captain’s details. The endpoint also sets a cookie with the token.

#### HTTP Method
`POST`

#### Request URL
```
http://localhost:4000/captains/login
```
*Replace with your server’s domain and port if different.*

#### Headers
| Key           | Value            |
|---------------|------------------|
| Content-Type  | application/json |

#### Request Body
The request body must be a JSON object with the following structure:

| Field      | Type   | Required | Description              |
|------------|--------|----------|--------------------------|
| `email`    | string | Yes      | A valid email address.   |
| `password` | string | Yes      | The captain's password.  |

##### Example Request Body
```json
{
  "email": "alice.smith@example.com",
  "password": "securePassword123"
}
```

#### Response

##### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```
*Note: The token is also set as a cookie (`token`).*

##### Error Responses
- **422 Unprocessable Entity:** Input data did not meet validation requirements.
- **401 Unauthorized:** Invalid email or password.
- **500 Internal Server Error:** An unexpected error occurred on the server.

---

# captainsProfile
### Endpoint: `/captains/profile`

#### Description
The `/captains/profile` endpoint retrieves the authenticated captain’s profile information. This endpoint requires a valid JWT token provided in the Authorization header or cookie.

#### HTTP Method
`GET`

#### Request URL
```
http://localhost:4000/captains/profile
```
*Replace with your server’s domain and port if different.*

#### Headers
| Key           | Value                          |
|---------------|--------------------------------|
| Content-Type  | application/json               |
| Authorization | Bearer <JWT_TOKEN>             |

#### Response

##### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
  "captain": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

##### Error Responses
- **401 Unauthorized:** Invalid or missing authentication token.
- **500 Internal Server Error:** An unexpected error occurred on the server.

---

# captainsLogout
### Endpoint: `/captains/logout`

#### Description
The `/captains/logout` endpoint logs out the currently authenticated captain by adding the JWT token to a blacklist and clearing the token cookie. This prevents the token from being used again.

#### HTTP Method
`GET`

#### Request URL
```
http://localhost:4000/captains/logout
```
*Replace with your server’s domain and port if different.*

#### Headers
| Key           | Value                          |
|---------------|--------------------------------|
| Content-Type  | application/json               |
| Authorization | Bearer <JWT_TOKEN>             |

#### Response

##### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
  "message": "Logged out successfully"
}
```

##### Error Responses
- **401 Unauthorized:** Invalid or missing authentication token.
- **500 Internal Server Error:** An unexpected error occurred on the server.

---

# ridesCreate
## Endpoint: `/rides/create`

### **Description**
The `/rides/create` endpoint allows authenticated users to create a new ride request. The endpoint validates the locations, calculates fare based on distance and vehicle type, and creates a ride record in the database.

### **HTTP Method**
`POST`

### **Request URL**
```
http://localhost:4000/rides/create
```
*Replace with your server's domain and port if different.*

### **Headers**
| Key           | Value                          |
|---------------|--------------------------------|
| Content-Type  | application/json               |
| Authorization | Bearer <JWT_TOKEN>             |

### **Request Body**
The request body must be a JSON object with the following structure:

| Field         | Type   | Required | Description                                                |
|--------------|---------|----------|------------------------------------------------------------|
| `pickup`     | string  | Yes      | Pickup location. Must be at least 3 characters long.      |
| `dropoff`    | string  | Yes      | Dropoff location. Must be at least 3 characters long.     |
| `vehicleType`| string  | Yes      | Type of vehicle. Must be one of: 'car', 'bike', 'auto'.  |

#### **Example Request Body**
```json
{
  "pickup": "123 Main St, City",
  "dropoff": "456 Oak Ave, City",
  "vehicleType": "car"
}
```

### **Response**

#### **Success Response**
- **Status Code**: `201 Created`
- **Response Body**:
```json
{
  "ride": {
    "_id": "60c72b2f9b1e8e3a50c8b456",
    "user": "60c72b2f9b1e8e3a50c8b123",
    "pickup": "123 Main St, City",
    "dropoff": "456 Oak Ave, City",
    "vehicleType": "car",
    "fare": 150,
    "status": "pending",
    "distance": 5000,
    "duration": 900,
    "orderId": "RIDE-X1Y2Z3",
    "otp": "123456"
  }
}
```

#### **Error Responses**
- **400 Bad Request**: Input data did not meet validation requirements.
- **401 Unauthorized**: Missing or invalid authentication token.
- **500 Internal Server Error**: An unexpected error occurred on the server.

#### **Example cURL**
```bash
curl -X POST http://localhost:4000/rides/create \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{
  "pickup": "123 Main St, City",
  "dropoff": "456 Oak Ave, City",
  "vehicleType": "car"
}'
```

---

# mapsGetCoordinates
## Endpoint: `/maps/get-coordinates`

#### Description
Gets the latitude and longitude coordinates for a given address using the Google Maps Geocoding API.

#### HTTP Method
`GET`

#### Request URL
```
http://localhost:4000/maps/get-coordinates
```
*Replace with your server's domain and port if different.*

#### Headers
| Key           | Value                          |
|---------------|--------------------------------|
| Content-Type  | application/json               |
| Authorization | Bearer <JWT_TOKEN>             |

#### Query Parameters
| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| `address` | string | Yes      | The address to get coordinates for   |

#### Success Response
- **Status Code:** `200 OK`
- **Response Body:**
```json
{
  "success": true,
  "coordinates": {
    "latitude": 37.4224764,
    "longitude": -122.0842499
  }
}
```

#### Error Responses
- **400 Bad Request:** Invalid or missing `address` parameter.
- **401 Unauthorized:** Invalid or missing authentication token.
- **500 Internal Server Error:** An unexpected error occurred on the server.

---

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

#### Example cURL for `/captains/register`
```bash
curl -X POST http://localhost:4000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

#### Example cURL for `/captains/login`
```bash
curl -X POST http://localhost:4000/captains/login \
-H "Content-Type: application/json" \
-d '{
  "email": "alice.smith@example.com",
  "password": "securePassword123"
}'
```

#### Example cURL for `/captains/profile`
```bash
curl -X GET http://localhost:4000/captains/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Example cURL for `/captains/logout`
```bash
curl -X GET http://localhost:4000/captains/logout \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Example cURL for `/rides/create`
```bash
curl -X POST http://localhost:4000/rides/create \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{
  "pickup": "123 Main St, City",
  "dropoff": "456 Oak Ave, City",
  "vehicleType": "car"
}'
```

#### Example cURL for `/maps/get-coordinates`
```bash
curl -X GET "http://localhost:4000/maps/get-coordinates?address=1600 Amphitheatre Parkway, Mountain View, CA" \
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
