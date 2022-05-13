import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ordersModel from '../models/orders.model'

class ordersController {
  // Create New Order
  async createNewOrder(req: Request, res: Response, next: NextFunction) {
    try {
      // Filter Request Body
      const { status, user_id } = req.body
      const orderSpecs = { status, user_id }

      //   Make Sure That all Fields That Are Needed To Create An Order Is Valid
      if (!status || !user_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: 'Please enter all required fields to create an order'
        })
      }

      // Add New Order To DB
      const order = await ordersModel.createNewOrder(orderSpecs)
      // Rerurn Results
      return res
        .status(StatusCodes.CREATED)
        .json({ status: 'CREATED', message: 'order created successfully', data: { order } })
    } catch (err) {
      next(err)
    }
  }

  // Get All Orders From DB
  async getAllOrders(_: Request, res: Response, next: NextFunction) {
    try {
      const orders = await ordersModel.getAllOrders()
      // Rerurn Results
      res.status(StatusCodes.OK).json({
        status: 'SUCCESS',
        message: `${orders.length} Orders retrievied successfully`,
        data: { orders }
      })
    } catch (err) {
      next(err)
    }
  }

  // Get All Orders From DB
  async getAllOrdersOfUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.params.user_id
      const orders = await ordersModel.getAllOrdersOfUserByID(user_id)
      // Rerurn Results
      res.status(StatusCodes.OK).json({
        status: 'SUCCESS',
        message: `${orders.length} Orders retrievied successfully`,
        data: { orders }
      })
    } catch (err) {
      next(err)
    }
  }

  // Get Order By ID
  async getOrderByID(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.order_id
      const order = await ordersModel.getOrderByID(id)

      // Rerurn Results
      if (order) {
        return res.status(StatusCodes.OK).json({
          status: 'SUCCESS',
          message: 'Order retrievied successfully',
          data: { order }
        })
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `Error on finding an order with the ID: ${id} , May be no order found with this ID`
        })
      }
    } catch (err) {
      next(err)
    }
  }

  // Update An Order Information
  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.order_id

      // Filter Request Body
      const { status, user_id } = req.body
      const orderSpecs = { status, user_id }

      const isOrderExists = await ordersModel.getOrderByID(id)

      if (!isOrderExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `There is not found order with this ID: ${id}`
        })
      }

      // Check IF No Provided Info To Update
      if (!status && !user_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: 'Please provide fields that you need to update order'
        })
      } else {
        const order = await ordersModel.updateOrder(id, orderSpecs)
        // Rerurn Results
        if (order) {
          return res.status(StatusCodes.ACCEPTED).json({
            status: 'SUCCESS',
            message: 'Order information updated successfully',
            data: { order }
          })
        } else {
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'BAD_REQUEST',
            message: `Error on update the order with the ID: ${id}`
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  // Delete An Order
  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.order_id
      const order = await ordersModel.deleteOrder(id)

      // Rerurn Results
      if (order) {
        return res
          .status(StatusCodes.NO_CONTENT)
          .json({ status: 'SUCCESS', message: 'Order deleted successfully', data: { order } })
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `Error on delete the order with the ID: ${id}, May be no order found with this ID`
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default new ordersController()
