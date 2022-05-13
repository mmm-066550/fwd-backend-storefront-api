import { Request, Response, NextFunction } from 'express'
import StatusCode from 'http-status-codes'

// Error Interface
interface Error {
  name?: string
  stack?: string
  message?: string
  status?: number
}

// A Function To Handle Errors Globally
const globalErrorHandler = (err: Error, _: Request, res: Response, next: NextFunction) => {
  const status = err.status || StatusCode.INTERNAL_SERVER_ERROR
  const message = err.message || 'internal server error (500)'
  res.status(status).json({ status: 'ERROR', message })
  next()
}
export default globalErrorHandler
