import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

// Error Interface
interface Error {
  name?: string
  stack?: string
  message?: string
  status?: number
}

const handleError = (next: NextFunction) => {
  const error: Error = new Error('Unauthorized Access, Try To Login Again!')
  error.status = StatusCodes.UNAUTHORIZED
  next(error)
}

const isJWTvalid = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization')
  if (authHeader) {
    const bearer = authHeader.split(' ')[0].toLowerCase()
    const token = authHeader.split(' ')[1]
    if (token && bearer === 'bearer') {
      const { JWT_SECRET } = process.env
      const decoded = jwt.verify(token, JWT_SECRET as unknown as string)
      if (decoded) {
        next()
      } else {
        handleError(next)
      }
    } else {
      handleError(next)
    }
  } else {
    handleError(next)
  }
}

export default isJWTvalid
