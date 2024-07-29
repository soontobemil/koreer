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

## Setting Up PostgreSQL

1. Install PostgreSQL

Follow the instructions for your operating system to install PostgreSQL:

- **Windows**: Download the installer from [PostgreSQL official website](https://www.postgresql.org/download/windows/) and follow the installation instructions.
- **macOS**: You can use Homebrew to install PostgreSQL:
```
    brew install postgresql

    brew services start postgresql
```
2. Create a New PostgreSQL User and Database
    1. Switch to the postgres user:
    ```
    sudo -i -u postgres
    ```
    2. Open the PostgreSQL prompt:
    ```
    psql
    ```
    3. Create a new user:
    ```
    CREATE USER koreer WITH PASSWORD 'koreer';
    ```
    4. Create a new database:
    ```
    CREATE DATABASE postgres;
    ```
    5. Grant all privileges on the database to the new user:
    ```
    GRANT ALL PRIVILEGES ON DATABASE postgres TO koreer;
    ```
## Running the Application
1. Start the development server:
    Using npm:
    ```npm start
    ```
2. The application will be running at http://localhost:3000.

## API Endpoints
Here are some of the API endpoints available in this project:
 - POST /users - Create a new user
 - GET /users/email@example.com - Get a user by Email

 Refer to the API documentation for a complete list of endpoints and their descriptions.