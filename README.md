Here’s the updated README with the considerations and added routes section:

````markdown
# Setup Guide

## Considerations Before Continuing

1. Didn't have time to implement a guard to use the user JWT generated on login.
2. The user can register and log in to emit the JWT secret.
3. Didn't have time to finish adding the holidays to the user account, but the holidays are being returned.

## Database Setup

Follow these steps to set up the database:

1. **Install PostgreSQL**:
   - Download and install PostgreSQL from [here](https://www.postgresql.org/download/).
2. **Create PostgreSQL User**:
   Open your terminal or command line interface and enter the following commands to create a new user and a database for the application:

   ```sql
   CREATE USER countryinfouser WITH PASSWORD 'countryinfopassword';
   CREATE DATABASE countryinfoapp OWNER countryinfouser;
   GRANT ALL PRIVILEGES ON DATABASE countryinfoapp TO countryinfouser;
   ```
````

3. **Database URL**:
   The database connection URL is already set up in the `.env` file as:
   ```
   postgres://countryinfouser:countryinfopassword@localhost:5432/countryinfoapp
   ```

## Backend Setup

After setting up the database, follow these steps to get the backend running:

1. **Install Dependencies**:
   Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

2. **Sync Prisma Models with the Database**:
   Run this command to push the Prisma models to the database:

   ```bash
   npx prisma db push
   ```

3. **Start the Backend**:
   Once the models are synced, you can start the application by running:

   ```bash
   npm run start
   ```

## API Routes

Here are the main API routes available:

### Authentication

- **POST** `/auth/register` — Register a new user.
- **POST** `/auth/login` — Login a user to receive the JWT token.

### User

- **POST** `/users/{userId}/calendar/holidays` — Add holidays to the user's calendar.

-not working-
- **GET** `/users/{userId}/calendar/holidays` — Get the holidays added to the user's calendar.

### Country

- **GET** `/countries` — Get a list of countries.
- **GET** `/countries/info/{countryCode}` — Get detailed information about a specific country by its code.

## Additional Information

- The `.env` file has been preconfigured with the correct database URL.
- Follow the instructions above to properly set up the PostgreSQL database and sync it with the backend before running the app.

```

This version includes the considerations, database setup instructions, backend setup, and the API routes section. Let me know if you need further adjustments or clarifications!
```
