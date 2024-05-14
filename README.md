# Soccer Blog by Andre Marroquin

This repository contains the code for a soccer blog, a dynamic web application for soccer enthusiasts to share and consume content related to soccer. This project is designed with a React frontend and a Node.js backend, using MySQL for data persistence.

### server

http://ghostdomain.xyz/

Ingresar como admin con usuario: andre password 123

## Getting Started

These instructions will help you to set up your own copy of the soccer blog on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- Docker
- Docker Compose

You can check if Node.js and npm are installed by running:
node --version
npm --version

## Installation
Follow these steps to get your development environment running:

### Clone the repository
Copy code
git clone https://github.com/mar22266/Proyecto1WEB.git

### Install Node dependencies
Navigate to the project directory and install the required npm packages:
- npm install

### Running the Application
Development Mode
To run the soccer blog in development mode, use:

### Copy code
- npm run dev
  
This will start the Node.js server on port 3001, and you should be able to access the app on http://localhost:3001.

### Using Docker Compose
To run the application with all its services (app and database) using Docker Compose, execute:

### Copy code
- docker-compose up --build
  
This command builds the Docker image for the application and starts the services defined in your docker-compose.yml file:

### MySQL Database: Runs on port 3301 and initializes with the provided schema.
### Node.js Application: Serves the soccer blog on port 3001.
