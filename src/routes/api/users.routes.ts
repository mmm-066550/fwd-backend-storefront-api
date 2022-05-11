import { Router } from 'express'
import usersController from '../../controllers/users.controller'

// Create Users Router Instance
const route = Router()

// Create A New User Router [POST:'api/users']
route.post('/', usersController.createNewUser)

// Get All Users Router [GET:'api/users']
route.get('/', usersController.getAllUsers)

// Get User By ID Router [GET:'api/users/:user_id']
route.get('/:user_id', usersController.getUserByID)

// Update User Router [PATCH:'api/users/:user_id']
route.patch('/:user_id', usersController.updateUser)

// Delete User Router [DELETE:'api/users/:user_id']
route.delete('/:user_id', usersController.deleteUser)

// Authenticate A User Router [POST:'api/users/auth']
route.post('/auth', usersController.authenticateUser)

export default route
