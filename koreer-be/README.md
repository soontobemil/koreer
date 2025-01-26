# koreer-be

## Overview
This is the backend of the Koreer application. It is built using Node.js, Express.js, and Sequelize ORM with a PostgreSQL database.

## Requirements
- Node.js v14.x or later
- npm
- PostgreSQL

## Installation
1. git clone
2. Install dependencies:
    ```npm install```

## Configuration
1. Create a .env file in the root directory of your project and add the following environment variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
```

## Setting Up Redis
1. Install Redis
    ```
    docker run --name my-redis -d -p 6379:6379 redis
    ```
2. Check Docker Redis ps
    ```
    docker ps
    ```

## Running the Application
1. Start the development server:
    Using npm:
    ```
    npm start
    ```
2. The application will be running at http://localhost:3000.

## API Endpoints
Here are some of the API endpoints available in this project:
 - POST /users - Create a new user
 - GET /users/email@example.com - Get a user by Email

 Refer to the API documentation for a complete list of endpoints and their descriptions.