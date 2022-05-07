import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import usersModel from '../models/user.model'

class UsersController {
  // Create New USer
  async createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Filter Request Body
      const { email, user_name, first_name, last_name, password } = req.body
      const userCredentials = { email, user_name, first_name, last_name, password }

      // Add New User To DB
      const user = await usersModel.createNewUser(userCredentials)

      // Rerurn Results
      res
        .status(StatusCodes.CREATED)
        .json({ status: 'CREATED', message: 'User created successfully', data: { user } })
    } catch (err) {
      next(err)
    }
  }

  // Get All Users From DB
  async getAllUsers(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await usersModel.getAllUsers()
      // Rerurn Results
      res.status(StatusCodes.OK).json({ status: 'SUCCESS', data: { users } })
    } catch (err) {
      next(err)
    }
  }
}

export default new UsersController()
