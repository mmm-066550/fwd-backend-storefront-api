import { Router } from 'express'
import usersRoute from './api/users.routes'

const route = Router()
route.use('/users', usersRoute)
export default route
