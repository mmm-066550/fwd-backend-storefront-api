import { Router } from 'express'
import productsController from '../../controllers/products.controller'

// Create Products Router Instance
const route = Router()

// Create A New Product Router [POST:'api/products']
route.post('/', productsController.createNewUser)

// Get All Products Router [GET:'api/products']
route.get('/', productsController.getAllProducts)

// Get Product By ID Router [GET:'api/products/:product_id']
route.get('/:product_id', productsController.getProductByID)

// Update Product Router [PATCH:'api/products/:product_id']
route.patch('/:product_id', productsController.updateProduct)

// Delete Product Router [DELETE:'api/products/:product_id']
route.delete('/:product_id', productsController.deleteProduct)

export default route
