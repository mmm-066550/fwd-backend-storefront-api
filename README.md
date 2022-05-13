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

```
EXPRESS_PORT=
NODE_ENV=
POSTGRESS_DB_HOST=
POSTGRESS_DB=
POSTGRESS_DB_PORT=
POSTGRESS_DB_USER=
POSTGRESS_DB_PASS=
BCRYPT_SALT=
BCRYPT_SECRET=
JWT_SECRET=
```

### 3. DB Creation and Migrations

```
CREATE DATABASE %db_name%;
```

```
npm run migrate:up
```

### 4. Build the project from TypeScript to JavaScript

```
npm run build
```

### 5. Start the Server

```
npm start
```

### The server will start on port: the user environment port, or the default host is on: http://localhost:3000.

## NPM-run Scripts

- `dev`: `nodemon ./src/server.ts`,
- `build`: `npm run clean && npx tsc`,
- `start`: `npm run build && nodemon build/server.js`,
- `format:src`: `prettier --write src/\*_/_.ts`,
- `format:build`: `prettier --write build/\*_/_.js`,
- `lint`: `eslint . --ext .ts`,
- `migrate:up`: `db-migrate up`,
- `migrate:down`: `db-migrate down`,
- `clean`: `rimraf build/`,
- `test`: `npx tsc && jasmine`
