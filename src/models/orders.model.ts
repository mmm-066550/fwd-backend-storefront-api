import order from '../types/order.type'
import db from '../database'
import {
  CreteNewOrderSQL,
  GetAllOrdersSQL,
  GetAllOrdersOfUserSQL,
  GetOrderByIDSQL,
  UpdateOrderSQL,
  DeleteOrderSQL
} from '../sql/orders.sql'

// Create Class To Handle ORDERS Model Operations
class Orders {
  // CREATE A NEW ORDER
  async createNewOrder(order: order): Promise<order> {
    try {
      const model = await db.connect()
      const result = await model.query(CreteNewOrderSQL, [order.status, order.user_id])
      model.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Error on creating a new order')
    }
  }

  // GET ALL ORDERS FROM DB
  async getAllOrders(): Promise<order[]> {
    try {
      const model = await db.connect()
      const result = await model.query(GetAllOrdersSQL)
      model.release()
      return result.rows
    } catch (err) {
      throw new Error(`Error on retrieve all orders`)
    }
  }

  //   GET ORDER BY ID
  async getOrderByID(id: string): Promise<order> {
    try {
      const model = await db.connect()
      const result = await model.query(GetOrderByIDSQL, [id])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error on retrieve order with ID: ${id}`)
    }
  }

  //   GET ALL ORDERS OF SPECIFIC USER
  async getAllOrdersOfUserByID(user_id: string): Promise<order[]> {
    try {
      const model = await db.connect()
      const result = await model.query(GetAllOrdersOfUserSQL, [user_id])
      model.release()
      return result.rows
    } catch (err) {
      console.log(err)

      throw new Error(`Error on retrieve all orders of user with ID: ${user_id}`)
    }
  }

  // UPDATE AN ORDER INFORMATION
  async updateOrder(id: string, order: order): Promise<order | null> {
    try {
      const model = await db.connect()
      const current = await this.getOrderByID(id as string)
      model.release()

      if (current) {
        const result = await model.query(UpdateOrderSQL, [
          order.id || current.id,
          order.status || current.status,
          order.user_id || current.user_id
        ])
        return result.rows[0]
      } else {
        return null
      }
    } catch (err) {
      console.log(err)

      throw new Error(`Error on updating order with ID: ${order.id}`)
    }
  }

  // DELETE AN ORDER
  async deleteOrder(id: string): Promise<order> {
    try {
      const model = await db.connect()
      const result = await model.query(DeleteOrderSQL, [id])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error on deleteing order with id: ${id}`)
    }
  }
}

// Export Model Instance
export default new Orders()
