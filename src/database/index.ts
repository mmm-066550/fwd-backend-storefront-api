import dotenv from 'dotenv'
import { Pool } from 'pg'

// Configure NodeJS App Environment Variables
dotenv.config({ path: '.env' })

// Destructuring Postgress DB Credentials From Node Environment Variables
const {
  POSTGRESS_DB_HOST,
  POSTGRESS_DB,
  POSTGRESS_DB_TEST,
  POSTGRESS_DB_PORT,
  POSTGRESS_DB_USER,
  POSTGRESS_DB_PASS
} = process.env

let DB
if (process.env.NODE_EVN === 'dev') {
  DB = POSTGRESS_DB_TEST
} else {
  DB = POSTGRESS_DB
}

// Create Postgres DB Pool Instance
const pool = new Pool({
  host: POSTGRESS_DB_HOST,
  database: DB,
  user: POSTGRESS_DB_USER,
  password: POSTGRESS_DB_PASS,
  port: POSTGRESS_DB_PORT as unknown as number
})

// Handle DB Connection Error
pool.on('error', (err: Error) => console.error(err))

export default pool
