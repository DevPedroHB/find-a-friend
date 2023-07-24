<h1 align="center">FindAFriend API</h1>

<p align="center">
  The FindAFriend API is an API developed to facilitate the process of adopting animals, allowing users to find animals available for adoption and carry out the adoption process in an easy and safe way. The API was developed following the principles of SOLID and has tests to ensure the quality and integrity of the system.
</p>

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-packages">Packages</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-features">Features</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

## 🚀 Technologies

Here are the technologies used in this project.

- TypeScript 5.1.6
- NodeJS 18.14.2
- Fastify 4.19.2
- Vitest 0.33.0
- Prisma 4.16.2

## 📦 Packages

Here are the production packages used in this project.

- <b>@fastify/cookie</b> -> Plugin for the Fastify framework that allows developers to set, get and delete HTTP cookies in web applications.
- <b>@fastify/jwt</b> -> Plugin for the Fastify framework that allows developers to use JWT tokens (JSON Web Token) to authenticate users in web applications.
- <b>bcryptjs</b> -> Library that uses a secure hash function based on the bcrypt algorithm to transform text into an encrypted hash.
- <b>dayjs</b> -> Date and time manipulation library for JavaScript.
- <b>zod</b> -> Used for data validation in JavaScript.

## 💻 Getting started

Here are the commands and steps on how to start the project.

### Dependency

- NodeJS
- NPM (Package manager of your choice)

### Steps

```bash
# Run to start the containers defined in the 'docker-compose.yml' file.
docker compose up

# To install dependencies.
npm install

# Run to synchronize your database schema with the migrations defined in your Prisma project.
npx prisma migrate dev

# To start the project on your machine.
npm run dev

# Runs the automated tests present in the 'src/use-cases' folder.
npm run test

# Runs the automated tests present in the 'src/use-cases' folder with continuous monitoring of code changes.
npm run test:watch

# Runs the end-to-end tests present in the 'src/http' folder.
npm run test:e2e

# Runs the end-to-end tests present in the 'src/http' folder with continuous monitoring of code changes.
npm run test:e2e:watch

# Runs the automated tests present in the 'src/use-cases' folder and displays code coverage using the vitest package.
npm run test:coverage

# Run the interfaced tests using the vitest package.
npm run test:ui

# To build the project.
npm run build

# To run the project in production.
npm run start

# To format the 'src' folder code using eslint settings.
npm run lint
```

## 🔥 Features

Here are the main features of the project.

- Functional Requirements:
  - [x] It must be possible to register a pet;
  - [x] It must be possible to list all pets available for adoption in a city;
  - [x] It must be possible to filter pets by their characteristics;
  - [x] It must be possible to view details of a pet for adoption;
  - [x] It must be possible to register as an ORG;
  - [x] It must be possible to login as an ORG;
- Business Rules:
  - [x] To list the pets, we must inform the city;
  - [x] An ORG needs to have an address and a WhatsApp number;
  - [x] A pet must be linked to an ORG;
  - [x] The user who wants to adopt will contact the ORG via WhatsApp;
  - [x] All filters other than city are optional;
  - [x] For an ORG to access the application as admin, it needs to be logged in;
- Endpoints:
  - Orgs:
    - POST /orgs/sign-up: Sign-up of a new org.
    - POST /orgs/sign-in: Sign-in with an org.
    - PATCH /orgs/token/refresh: JWT token update.
  - Pets:
    - POST /pets: Create a new pet.
    - GET /pets/{city}: List all pets available for adoption in a city.
    - GET /pets/details/{id}: View details of a pet for adoption.
  - Locations:
    - GET /locations/states: List all states from Brazil.
    - GET /locations/cities/{uf_code}: List all cities from a uf code.
    - GET /locations/geo/{cep}: List the location of a zip code.

## :memo: License

This project is licensed under the MIT license.

---

Made with ♥ by Pedro Henrique 🚀 [Never stop learning!](https://github.com/DevPedroHB)
