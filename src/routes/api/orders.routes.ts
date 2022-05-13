import { Router } from 'express'
import ordersController from '../../controllers/orders.controller'

// Create Orders Router Instance
const route = Router()

// Create A New Order Router [POST:'api/orders']
route.post('/', ordersController.createNewOrder)

// Get All Orders Router [GET:'api/orders']
route.get('/', ordersController.getAllOrders)

// Get Order Of An User By User ID Router [GET:'api/orders/user/:user_id']
route.get('/user/:user_id', ordersController.getAllOrdersOfUser)

// Get An Order By ID Router [GET:'api/orders/:order_id']
route.get('/:order_id', ordersController.getOrderByID)

// Update Order Router [PATCH:'api/orders/:order_id']
route.patch('/:order_id', ordersController.updateOrder)

// Delete Order Router [DELETE:'api/orders/:order_id']
route.delete('/:order_id', ordersController.deleteOrder)

export default route
