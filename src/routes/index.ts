import { Router } from 'express'
import usersRoute from './api/users.routes'
import productsRoute from './api/products.routes'

const route = Router()
route.use('/users', usersRoute)
route.use('/products', productsRoute)

export default route
