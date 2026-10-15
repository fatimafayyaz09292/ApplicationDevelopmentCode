# Pak Tours

A travel and tourism website inspired by online booking platforms such as Booking.com, developed with frontend and backend components.

## Project Overview

Pak Tours is a travel and tourism web application designed around travel-related services and booking functionality. The project combines a multi-page frontend with a backend application to organise travel information and support related website functionality.

The project demonstrates the application of web development principles, frontend and backend integration, database technologies, and application development practices.

## Project Objectives

- Develop a multi-page website for a travel and tourism service.
- Organise travel-related content and package information through a user-facing interface.
- Structure the application using frontend and backend components.
- Apply application development principles to connect the website interface with backend functionality.

## Technology Stack

### Frontend
- HTML
- CSS
- SCSS
- JavaScript

### Backend
- Node.js
- TypeScript
- Express.js

### Database
- PostgreSQL
- Prisma ORM

## Repository Structure

The repository contains the website frontend and backend application.

- `code/application/PakToursFrontend/PakTours/` — frontend website files, including HTML pages, stylesheets, JavaScript, and images.
- `code/application/pak-toursbackend/pak-tours/` — backend source code, configuration, and Prisma database schema.
- `README.md` — project documentation.

## Prerequisites

To set up the backend, you will need:

- Node.js and npm
- PostgreSQL
- Git

## Backend Setup

### 1. Navigate to the backend directory

From the repository root, run:

```bash
cd code/application/pak-toursbackend/pak-tours
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file from the provided example:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` value in `.env` with the connection details for your own PostgreSQL database.

The environment variables include:

| Variable | Purpose |
|---|---|
| `PORT` | Server port; defaults to `8000` |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma |

Do not commit your `.env` file or publish database credentials, tokens, or other secrets.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

For a new development database, you may synchronise the schema using:

```bash
npx prisma db push
```

Use this only with a database you control. Review the schema and potential database changes before running the command. For production, use a properly reviewed database migration workflow.

### 5. Build and start the backend

```bash
npm start
```

The start script builds the TypeScript application and then starts the compiled server. The default port is `8000`, unless another port is configured through the environment.

## API Routes

The backend registers the following API base paths:

| Feature | Base path |
|---|---|
| User authentication | `/api/v1/user` |
| Travel packages | `/api/v1/travel` |
| Bookings | `/api/v1/booking` |
| Newsletter subscriptions | `/api/v1/newsletter` |

The travel-package routes include operations for listing, retrieving, creating, updating, and deleting packages. Refer to the backend route files for the exact endpoints and HTTP methods.

**Testing note:** The travel-package listing endpoint has returned HTTP `200 OK` during local development. Other API operations require separate testing.

## Frontend

The frontend website is located at:

```text
code/application/PakToursFrontend/PakTours/
```

Open `index.html` in a browser to view the website interface. Some functionality may require the backend server, a configured database, or additional setup.

## Testing and Build

From the backend directory, build the application using:

```bash
npm run build
```

To start the backend:

```bash
npm start
```

With the backend running, you can test the travel-package listing endpoint using:

```bash
curl -i http://localhost:8000/api/v1/travel
```

Database-dependent functionality requires a valid PostgreSQL connection and appropriate configuration.

## Current Verification Status

- The TypeScript backend build completed successfully in the development environment.
- The travel-package listing endpoint returned HTTP `200 OK` during local testing.
- An example environment configuration is provided in `.env.example`.
- Authentication, booking, newsletter, and other API operations have not all been independently tested.
- A fresh-clone setup and production deployment have not yet been verified.

## Security and Development Notes

- Keep `.env` and other secret files out of version control.
- Use your own development database credentials.
- Never publish passwords, authentication tokens, or private service credentials.
- Review authentication, input validation, CORS configuration, and error handling before production deployment.
