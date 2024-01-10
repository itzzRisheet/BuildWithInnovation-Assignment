# Node.js login system

Welcome to node-loin-system Application! This documentation provides a brief overview of the main components, including controllers and routes.

## Components

### 1. `auth.js`

#### Middleware for User Authentication

- This middleware (`auth.js`) handles user authentication using JSON Web Tokens (JWT).
- It verifies the JWT token from the `Authorization` header and attaches decoded user information to the request object.
- **Usage in Routes:** Applied to routes that require user authentication.

### 2. `controller.js`

#### User Authentication and Management

- `validate`: Middleware for validating user input (email, password, contact).
- `register`: Handles user registration, checks for existing email or contact, and hashes passwords before saving to the database.
- `login`: Handles user login, validates email or contact, compares passwords, and generates JWT tokens for successful logins.
- `getUser`: Retrieves user details, admin can query by ID, email, or contact; non-admin gets details of the logged-in user.
- `updateUser`: Updates user details, admin can update by email, contact, or ID; non-admin updates details of the logged-in user.
- `deleteUser`: Deletes users, admin can delete by email, contact, or ID; non-admin deletes the logged-in user.

### 3. `routes.js`

#### API Routes

- Defines various endpoints for user-related operations, including registration, login, authentication, user retrieval, user deletion, creating a reset session, and updating user information.
- **Usage:** Applied to different HTTP methods (POST, GET, PUT, DELETE).

## Usage Examples

### User Registration

#### Endpoint: `/register`
- **Method:** POST
- **Input Example:**
- **Admin must register with @adminsecret.com domain else any other emails will be consider as users**
  ```json
  {
    "email": "user@example.com",
    "password": "StrongPass123",
    "contact": "1234567890",
    "name": "John Doe",
    "profile": "user-profile-data"
  }

### User Login

#### Endpoint: `/login`
- **Method:** POST
- **Input Example:**
- **note token you got in the response data**
  ```json
  {
  "email": "user@example.com",
  "password": "StrongPass123"
}


### Retrieve User Details

#### Endpoint: `/user`
- **Method:** POST
- **Input Example:**\
   - **if( admin ) then provide email or contact of the user else login and provide bearer token as authorization headers**
  - **admin also need to login first and provide bearer token as authorization headers to know that it is admin**
  ```json
  {
  "id": "user_id_to_retrieve",
          or
  "email": "user@example.com",
          or
  "contact": "1234567890"
}


### Update User Details

#### Endpoint: `/updateUser`
- **Method:** POST
- **Input Example:**
  - **if( admin ) then provide email or contact of the user else login and provide bearer token as authorization headers**
  - **admin also need to login first and provide bearer token as authorization headers to know that it is admin**
  ```json
  {
 ------------------------------
  "contact": "1234567890",
      or
    "email": "user@example.com",
---------------------------------
  
    "password": "StrongPass123",
    "name": "John Doe",
    "profile": "user-profile-data"
  }

  
### get User

#### Endpoint: `/user`
- **Method:** POST
- **Input Example:**
- - **if( admin ) then provide these else login and provide bearer token as authorization headers**
  - **admin also need to login first and provide bearer token as authorization headers to know that it is admin**

  ```json
  {
  "id": "user_id_to_retrieve",
          OR
  "email": "user@example.com",
          OR
  "contact": "1234567890"
}


### Delete User

#### Endpoint: `/deleteUser`
- **Method:** POST
- **Input Example:**
- **if( admin ) then provide these else login and provide bearer token as authorization headers**
  - **admin also need to login first and provide bearer token as authorization headers to know that it is admin**

  ```json
  
  {
  "id": "user_id_to_retrieve",
          OR
  "email": "user@example.com",
          OR
  "contact": "1234567890"
}
