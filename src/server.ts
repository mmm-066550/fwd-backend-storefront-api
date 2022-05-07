import express, { Application } from 'express'
import globalErrorHandler from './middlewares/globalErrorsHandler'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import db from './database'
import apiRoute from './routes'

// Configure NodeJS App Environment Variables
dotenv.config({ path: '.env' })

// Create Api Express Server Instance
const app: Application = express()

// Api Server Middlewars
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

// Server Routes
app.use('/api', apiRoute)

// Api Server Global Errors Handler
app.use(globalErrorHandler)

// Listen To Api Express Server
const PORT = process.env.EXPRESS_PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
  // Connect To Postgres DB
  db.connect().then(async (client) => {
    try {
      await client.query('SELECT NOW()').then(() => {
        console.log('DB Connected')
      })
      client.release()
    } catch {
      client.release()
      throw new Error('DB Connection Error')
    }
  })
})

export default app
