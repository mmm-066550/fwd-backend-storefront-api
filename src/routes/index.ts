import { Router } from 'express'
import usersRoute from './api/users.routes'
import productsRoute from './api/products.routes'
import ordersRoute from './api/orders.routes'
import orderProductsRoute from './api/order-products.routes'

const route = Router()
route.use('/users', usersRoute)
route.use('/products', productsRoute)
route.use('/orders', ordersRoute)
route.use('/order-products', orderProductsRoute)

export default route
