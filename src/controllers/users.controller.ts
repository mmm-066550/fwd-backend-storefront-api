import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import usersModel from '../models/users.model'

class UsersController {
  // Create New USer
  async createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Filter Request Body
      const { email, first_name, last_name, password } = req.body
      const userCredentials = { email, first_name, last_name, password }

      // Check If Email Is Already Registered
      const users = await usersModel.getAllUsers()
      if (users.find((user) => user.email === email)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: 'BAD_REQUEST', message: 'This email address is already registered' })
      } else {
        // Add New User To DB
        const user = await usersModel.createNewUser(userCredentials)

        // Rerurn Results
        return res
          .status(StatusCodes.CREATED)
          .json({ status: 'CREATED', message: 'User created successfully', data: { user } })
      }
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

  // Get User By ID
  async getUserByID(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.user_id
      const user = await usersModel.getUserByID(id)
      // Rerurn Results
      if (user) {
        return res.status(StatusCodes.OK).json({ status: 'SUCCESS', data: { user } })
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: 'BAD_REQUEST', message: `Couldn't find a user with the ID: ${id}` })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default new UsersController()
