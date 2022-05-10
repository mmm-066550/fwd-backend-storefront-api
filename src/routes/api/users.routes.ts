import { Router } from 'express'
import usersController from '../../controllers/users.controller'

// Create Users Router Instance
const route = Router()

// Create A New User Router [POST:'api/users']
route.post('/', usersController.createNewUser)

// Get All Users Router [GET:'api/users/all']
route.get('/all', usersController.getAllUsers)

// Get User By ID Router [GET:'api/users/:user_id']
route.get('/:user_id', usersController.getUserByID)

export default route
