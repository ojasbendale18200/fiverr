# Fiverr Project

This repository contains the code for my project on Fiverr.

## Overview

The goal of this project is to develop a platform that connects freelancers with clients who require various services. Users can create accounts, browse through available services, and hire freelancers for their specific needs. The project aims to streamline the process of finding and hiring freelancers, providing a user-friendly interface and a secure transaction system.

## Features

- User registration and authentication
- Profile creation and management
- Service listing and search functionality
- Messaging system for communication between clients and freelancers
- Secure payment processing
- Rating and review system for freelancers
- Client can create our own project

## Technologies Used

- Front-end: HTML, CSS, JavaScript,ReactJs
- Back-end: Node.js, Express.js
- Database: MongoDB
- Payment Integration: Stripe
- Authentication: JWT (JSON Web Tokens)
- Deployment: Vercel

## Installation

1. Clone the repository:
git clone https://github.com/ojasbendale18200/fiverr.git

2. Install the dependencies:
```bash
cd fiverr
npm install
````

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
   - 
5 Environment Variables

The following environment variables are required to run the project. Make sure to set them up before starting the application:

- `PORT`: The port number on which the server will run. Set it to `3000` or any other available port.

- `DB_CONNECTION`: The MongoDB connection string. Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.

- `JWT_SECRET`: The secret key used for JSON Web Token (JWT) encryption. Replace `<your_jwt_secret_key>` with your desired secret key.

- `STRIPE_API_KEY`: The API key for the Stripe payment integration. Replace `<your_stripe_api_key>` with your actual Stripe API key.

You can set these environment variables by creating a `.env` file in the root directory of the project and assigning the values as shown above.

6. Start the server:
```bash
npm run server
```


7. Start React Application
```bash
npm start
```

## ScreenShots


### 1. Homepage
![homepage](https://github.com/ojasbendale18200/fiverr/assets/78263538/817c7f2c-a2fc-439a-a780-dace509b69b4)

### 2. Services
![allservices](https://github.com/ojasbendale18200/fiverr/assets/78263538/b26fb2e4-2ca2-47a5-916e-88ce70d6504d)

### 3. Single Service
![singleservice](https://github.com/ojasbendale18200/fiverr/assets/78263538/bf425e05-833d-47c0-b78b-4ed5e4112f31)

### 4. Reviews
![reviews](https://github.com/ojasbendale18200/fiverr/assets/78263538/20025f84-773d-4740-bf74-658b693a5bee)

### 5. Messages
![messages](https://github.com/ojasbendale18200/fiverr/assets/78263538/85e44794-1a76-4ed8-a495-9eaa29ce5391)

### 6. Conversation
![conversation](https://github.com/ojasbendale18200/fiverr/assets/78263538/d6cd0694-c8f8-4e4a-b13a-e22eadf5feab)

### 7. AddService
![addnewgig](https://github.com/ojasbendale18200/fiverr/assets/78263538/fc23de4c-8adc-4c51-8752-4228fbdc3b7f)

### 8. Payment
![payment](https://github.com/ojasbendale18200/fiverr/assets/78263538/b0922ffd-e1cf-4bda-ae11-78369861e908)

### 8. Orders
![orders](https://github.com/ojasbendale18200/fiverr/assets/78263538/efc358bd-f0cf-4b9f-a20e-0ecf2a10c340)







