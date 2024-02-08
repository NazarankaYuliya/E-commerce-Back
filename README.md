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
    "email": "string",
    "password": "string"
  }
  ```
