import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import orderProductsModel from '../models/orders-products.model'

class orderProductsController {
  // Create New Order Product
  async createNewOrderProduct(req: Request, res: Response, next: NextFunction) {
    try {
      // Filter Request Body
      const { order_id, product_id, quantity } = req.body
      const orderProductSpecs = { order_id, product_id, quantity }

      // Make Sure That all Fields That Are Needed To Create A Order Product Is Valid
      if (!order_id || !product_id || !quantity) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: 'Please enter all required fields to add a order product'
        })
      }
      const product = await orderProductsModel.createNewOrderProducts(orderProductSpecs)
      return res.status(StatusCodes.CREATED).json({
        status: 'CREATED',
        message: 'order product created successfully',
        data: { product }
      })
    } catch (err) {
      next(err)
    }
  }

  // Get All Order Products From DB
  async getAllOrderProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const products = await orderProductsModel.getAllOrderProducts(id)
      // Rerurn Results
      res.status(StatusCodes.OK).json({
        status: 'SUCCESS',
        message: `${products.length} Order products retrievied successfully`,
        data: { products }
      })
    } catch (err) {
      next(err)
    }
  }

  // Get Product Of An Order By ID
  async getOrderProductByID(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const product_id = req.params.product_id
      const product = await orderProductsModel.getOrderProductsByID(id, product_id)
      // Rerurn Results
      if (product) {
        return res.status(StatusCodes.OK).json({
          status: 'SUCCESS',
          message: 'Order product retrievied successfully',
          data: { product }
        })
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `Error on find a product with the ID: ${product_id}`
        })
      }
    } catch (err) {
      next(err)
    }
  }

  // Update A Product Of An Order Product Information
  async updateOrderProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const product_id = req.params.product_id

      //   Filter Request Body
      const { order_id, quantity } = req.body
      const orderProductSpecs = { id, order_id, product_id, quantity }

      //   Check IF No Provided Info To Update
      if (!order_id && !product_id && !quantity) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: 'Please provide fields that you need to update the product'
        })
      } else {
        const product = await orderProductsModel.updateOrderProducts(orderProductSpecs)
        // Rerurn Results
        if (product) {
          return res.status(StatusCodes.ACCEPTED).json({
            status: 'SUCCESS',
            message: 'Product information updated successfully',
            data: { product }
          })
        } else {
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'BAD_REQUEST',
            message: `Error on update the product with the ID: ${product_id}`
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  // Delete A Product
  async deleteOrderProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const product_id = req.params.product_id
      const product = await orderProductsModel.deleteOrderProducts(id, product_id)

      // Rerurn Results
      if (product) {
        return res
          .status(StatusCodes.NO_CONTENT)
          .json({ status: 'SUCCESS', message: 'Product deleted successfully', data: { product } })
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `Error on delete the product with the ID: ${product_id}, May be no product found with this ID`
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default new orderProductsController()
