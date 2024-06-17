# Store Product Api

This project is a NestJS application for a simple product api. It uses TypeORM for PostgreSQL interactions. It includes full Docker support for development environment.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application with Docker](#running-the-application-with-docker)
- [API Documentation](#api-documentation)
  - [Swagger](#swagger)
- [Endpoints](#endpoints)

## Features

- REST API endpoints for product data management.
- Swagger API documentation.
- Dockerized environment setup for development.
- Response transformation with interceptors.

## Prerequisites

- Node
- Yarn
- Docker
- Docker Compose

## Installation

Clone the repository:

```bash
git clone https://github.com/remidosol/store-product-api.git
cd store-product-api
```

## Running the Application with Docker

Ensure Docker and Docker Compose are installed and then run:

```bash
docker compose up -d --build
```

This command will build the Docker image if it's not already built and start all services defined in `docker-compose.yml`, including the NestJS application and PostgreSQL.

## API Documentation

### Swagger

The Swagger documentation can be accessed at:

```bash
http://localhost:3333/api
```

##  Environment Variables

Ensure that you have a .env file located in `<rootDir>/secrets/.env`. This file should contain all the necessary environment variables required by the application.

Create a .env file in the secrets directory with the following variables:

```.env
DATABASE_URL=""
```

## Endpoints

### REST Endpoints

- **GET /product**: Get all products with optional sorting
- **GET /product/:productId**: Get product by ID
- **POST /product**: Create a new product
- **DELETE /product/:productId**: Delete a product by ID