import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import usersModel from '../models/users.model'
import generateJWT from '../utils/generateJWT'

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
        const token = generateJWT(user)

        // Rerurn Results
        return res
          .status(StatusCodes.CREATED)
          .json({ status: 'CREATED', message: 'User created successfully', data: { user, token } })
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
      res.status(StatusCodes.OK).json({
        status: 'SUCCESS',
        message: `${users.length} Users retrievied successfully`,
        data: { users }
      })
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
        return res
          .status(StatusCodes.OK)
          .json({ status: 'SUCCESS', message: 'User retrievied successfully', data: { user } })
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: 'BAD_REQUEST', message: `Error on find a user with the ID: ${id}` })
      }
    } catch (err) {
      next(err)
    }
  }

  // Update A User Information
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.user_id

      // Filter Request Body
      const { email, first_name, last_name, password } = req.body
      const userInformation = { id, email, first_name, last_name, password }

      const isUserExists = await usersModel.getUserByID(id)
      if (!isUserExists) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: 'BAD_REQUEST', message: `There is not found user with this ID: ${id}` })
      }

      // Check IF No Provided Info To Update
      if (!email && !first_name && !last_name && !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: 'BAD_REQUEST', message: 'Please provide fields that you need to update' })
      } else {
        const user = await usersModel.updateUser(userInformation)
        // Rerurn Results
        if (user) {
          return res.status(StatusCodes.ACCEPTED).json({
            status: 'SUCCESS',
            message: 'User information updated successfully',
            data: { user }
          })
        } else {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ status: 'BAD_REQUEST', message: `Error on update the user with the ID: ${id}` })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  // Delete A User
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.user_id
      const user = await usersModel.deleteUser(id)

      // Rerurn Results
      if (user) {
        return res
          .status(StatusCodes.NO_CONTENT)
          .json({ status: 'SUCCESS', message: 'Account deleted successfully', data: { user } })
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `Error on delete the user with the ID: ${id}, May be no user found with this ID`
        })
      }
    } catch (err) {
      next(err)
    }
  }

  // Authenticate A User
  async authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Filter Request Body
      const { email, password } = req.body

      // Check If User Email Or Password Is Missed
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: 'Missed user email or user password'
        })
      }

      const user = await usersModel.authenticateUser(email, password)

      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: 'User email or password is incorrect'
        })
      } else {
        const token = generateJWT(user)
        return res.status(StatusCodes.OK).json({
          status: 'SUCCESS',
          data: { user, token },
          message: 'User Authenticating JWT has issued successfully'
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default new UsersController()
