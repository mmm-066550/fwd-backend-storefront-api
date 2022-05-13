import { Router } from 'express'
import opController from '../../controllers/orders-products.controller'
import routeAuthGuard from '../../middlewares/authRoute'

// Create Orders Products Router Instance
const route = Router()

// Create A New Order Products Router [POST:'api/order-products']
route.post('/', routeAuthGuard, opController.createNewOrderProduct)

// Get All Orders Router [GET:'api/order-products/:id/products']
route.get('/:id/products', routeAuthGuard, opController.getAllOrderProducts)

// Get Product Of An Order By Order ID Router [GET:'api/order-products/:id/products/:product_id']
route.get('/:id/products/:product_id', routeAuthGuard, opController.getOrderProductByID)

// Update Product Of An Order Router [PATCH:'api/order-products/:id/products/:product_id']
route.patch('/:id/products/:product_id', routeAuthGuard, opController.updateOrderProduct)

// Delete Product Of An Order Router [DELETE:'api/order-products/:id/products/:product_id']
route.delete('/:id/products/:product_id', routeAuthGuard, opController.deleteOrderProduct)

export default route
