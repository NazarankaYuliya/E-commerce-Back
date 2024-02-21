# REST Service Documentation

## Endpoints

### Auth (`auth/` route)

- POST `/register` - New user registration

  **Request body**:

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- POST `/login` - User authorization

  **Request body**:

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Users (`users/` route)

- PUT `/:id` - Update user name

  **Request headers**:

  ```json
  {
    "token": "string"
  }
  ```

  **Request body**:

  ```json
  {
    "username": "string"
  }
  ```

- DELETE `/:id` - Delete user

  **Request headers**:

  ```json
  {
    "token": "string"
  }
  ```

- GET `/` - Get all user (for admin only)

  **Request headers**:

  ```json
  {
    "token": "string"
  }
  ```

- GET `/find/:id` - Get user by id (for admin only)

  **Request headers**:

  ```json
  {
    "token": "string"
  }
  ```

- GET `/stats` - Get users statistics (for admin only)

  **Request headers**:

  ```json
  {
    "token": "string"
  }
  ```

### Products (`products/` route)

- POST `/` - Create new product (for admin only)

  **Request headers**:

  ```json
  {
    "token": "string"
  }
  ```

  **Request body**:

  ```json
  {
    "title": "string",
    "desc": "string",
    "img": "string",
    "category": [],
    "price": "number"
  }
  ```
