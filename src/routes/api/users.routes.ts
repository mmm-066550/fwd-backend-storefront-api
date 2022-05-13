import { Router } from 'express'
import usersController from '../../controllers/users.controller'
import routeAuthGuard from '../../middlewares/authRoute'

// Create Users Router Instance
const route = Router()

// Create A New User Router [POST:'api/users']
route.post('/', usersController.createNewUser)

// Get All Users Router [GET:'api/users']
route.get('/', routeAuthGuard, usersController.getAllUsers)

// Get User By ID Router [GET:'api/users/:user_id']
route.get('/:user_id', routeAuthGuard, usersController.getUserByID)

// Update User Router [PATCH:'api/users/:user_id']
route.patch('/:user_id', routeAuthGuard, usersController.updateUser)

// Delete User Router [DELETE:'api/users/:user_id']
route.delete('/:user_id', routeAuthGuard, usersController.deleteUser)

// Authenticate A User Router [POST:'api/users/auth']
route.post('/auth', usersController.authenticateUser)

export default route
