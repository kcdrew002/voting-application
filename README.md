# voting-application
MERN Voting Application
# Ballot App

## Overview

The Ballot App is a web application that allows users to create and vote on polls or ballots. Users can create their own polls, view existing polls, and participate in the voting process.

## Features

- **User Authentication**: Users can sign up, log in, and authenticate themselves to access personalized features.

- **Create Polls**: Authenticated users can create polls by providing a question and a list of options.

- **View Polls**: Users can view a list of all polls available on the platform, including details about each poll.

- **Vote on Polls**: Authenticated users can vote on polls by selecting their preferred option.

- **User's Polls**: Users can view a list of polls they have created.

- **Delete Polls**: Poll creators can delete their own polls.

## Technologies Used

- Frontend:
  - React: A JavaScript library for building user interfaces.
  - Redux: A state management library for React applications.
  - React Router: A library for handling navigation in React applications.

- Backend:
  - Node.js: A JavaScript runtime for building server-side applications.
  - Express: A web application framework for Node.js.
  - MongoDB: A NoSQL database for storing poll data.
  - Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/kcdrew002/voting-application.git

   Certainly! Here's a rewritten version suitable for a `README.md` file:

# Project Dependencies

## Client Application (`client`)

### Testing
- **@testing-library/jest-dom (^5.17.0)**: Utilities for Jest to test the Document Object Model (DOM).
- **@testing-library/react (^13.4.0)**: Testing utilities for React components.
- **@testing-library/user-event (^13.5.0)**: Simulates user events for testing React components.

### HTTP Requests
- **axios (^1.6.2)**: A promise-based HTTP client for making requests to external APIs.

### Charting
- **chart.js (^4.4.0)**: A JavaScript library for creating interactive and customizable charts.
- **react-chartjs-2 (^5.2.0)**: React wrapper for Chart.js, facilitating easy chart integration into React applications.

### Authentication
- **jwt-decode (^4.0.0)**: Decodes JSON Web Tokens (JWT) on the client side.

### React
- **react (^18.2.0)**: The core React library.
- **react-dom (^18.2.0)**: React's package for working with the Document Object Model (DOM).

### State Management
- **react-redux (^8.1.3)**: Official React bindings for Redux, a predictable state container.
- **redux (^4.2.1)**: A state management library for JavaScript applications.
- **redux-thunk (^2.4.2)**: Middleware for asynchronous logic in Redux.

### Routing
- **react-router-dom (^6.20.0)**: Routing library for React applications.

### Build and Scripts
- **react-scripts (5.0.1)**: Scripts and configurations for building and running the React application.

### Metrics
- **web-vitals (^2.1.4)**: Library for measuring web vitals like performance and user experience.

## Server Application (`server`)

### Middleware
- **body-parser (^1.20.2)**: Middleware for parsing incoming request bodies in a Node.js server.
- **cors (^2.8.5)**: Middleware enabling Cross-Origin Resource Sharing (CORS) in the server.

### Environment Variables
- **dotenv (^16.3.1)**: Loads environment variables from a `.env` file into `process.env`.

### Web Framework
- **express (^4.18.2)**: Fast and minimalist web framework for Node.js.

### Authentication
- **jsonwebtoken (^9.0.2)**: Library for generating and verifying JSON Web Tokens (JWT).

### Database
- **mongoose (^8.0.0)**: MongoDB object modeling tool designed for use in an asynchronous environment.

### Development
- **nodemon (^3.0.1)** (Dev Dependency): Utility that monitors file changes and automatically restarts the server.

## Getting Started
Before running the applications, install the dependencies using `npm install` in both the `client` and `server` directories.
