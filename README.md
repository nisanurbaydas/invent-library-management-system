# Library Management System
A RESTful API for a library management system.

Used technologies:
- Node.js
- Express.js
- PostgreSQL
- Sequelize

## Getting Started
Install the dependencies:

```
npm install
```
To start project:
```
npm start
```
## Project Structure
```
src\
 |--controllers\    # Route controllers (controller layer)
 |--loaders\    # Db connection
 |--middlewares\     # Custom express middleware (Error handling and Validations)
 |--models\         # Postgre models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 ```
## API Documentation

## Validation
Request data is validated using Joi. Check the documentation for more details on how to write Joi validation schemas.

The validation schemas are defined in the src/validations directory and are used in the routes by providing them as parameters to the validate middleware.
