# koreer

## Setting Up PostgreSQL

### 1. Install PostgreSQL

Follow the instructions for your operating system to install PostgreSQL:

- **Windows**: Download the installer from [PostgreSQL official website](https://www.postgresql.org/download/windows/) and follow the installation instructions.
- **macOS**: You can use Homebrew to install PostgreSQL:

    brew install postgresql

    brew services start postgresql

### 2. Create a New PostgreSQL User and Database
1. Switch to the postgres user:

    sudo -i -u postgres

2. Open the PostgreSQL prompt:

    psql

3. Create a new user:

    CREATE USER koreer WITH PASSWORD 'koreer';

4. Create a new database:

    CREATE DATABASE postgres;

5. Grant all privileges on the database to the new user:

    GRANT ALL PRIVILEGES ON DATABASE postgres TO koreer;

### 3. Running the Application

1. Start the application:

    node app.js
