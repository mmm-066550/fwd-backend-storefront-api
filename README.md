# FWD Backend Storefront API

## Description

Backend storefront API with Node.JS, Express.JS, TypeScript and PostgresSQL Database (FWD_Udacity NanoDegree)

### Project build depended on

1. [TypeScript] (https://www.typescriptlang.org/docs/)
2. [Node.JS] (https://nodejs.org/dist/latest-v16.x/docs/api/)
3. [Express] (https://expressjs.com/)
4. [PostgresSQL] (https://www.postgresql.org/)
5. [DB_migrate] (https://db-migrate.readthedocs.io/)
6. [JsonWebToken] (https://jwt.io/)

### For Fixing and Formatting Code

2. [Prettier] (https://prettier.io/docs/en/index.html)
1. [ESLint] (https://eslint.org/docs/user-guide/getting-started)

### For Unit testing

1. [Jasmine] (https://jasmine.github.io/)
2. [supertest] (https://www.npmjs.com/package/supertest)

## Initialize The project

### 1. Install all dependencies

`npm i`

### 2. Create .env configuration file and fill it

` EXPRESS_PORT=` `NODE_ENV=` `POSTGRESS_DB_HOST=` `POSTGRESS_DB=` `POSTGRESS_DB_PORT=` `POSTGRESS_DB_USER=` `POSTGRESS_DB_PASS=` `BCRYPT_SALT=` `BCRYPT_SECRET=` `JWT_SECRET=`

<!-- ### 2. DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission! -->
