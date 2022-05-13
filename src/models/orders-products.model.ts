import db from '../database'
import orderProducts from '../types/order-products.type'
import {
  CreteNewOrderProductsSQL,
  GetOrderAllProductsSQL,
  GetProductsOfOrderSQL,
  UpdateOrderProductsSQL,
  DeleteOrderProductSQL
} from '../sql/orders-products.sql'

class orderProductsModel {
  //  Create A New Order Products
  async createNewOrderProducts(orderProducts: orderProducts): Promise<orderProducts> {
    try {
      const model = await db.connect()
      const result = await model.query(CreteNewOrderProductsSQL, [
        orderProducts.order_id,
        orderProducts.product_id,
        orderProducts.quantity
      ])
      model.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Error on creating new order products`)
    }
  }

  //  Get All Order Products
  async getAllOrderProducts(id: number | string): Promise<orderProducts[]> {
    try {
      const model = await db.connect()
      const result = await model.query(GetOrderAllProductsSQL, [id])
      model.release()
      return result.rows
    } catch (err) {
      throw new Error(`Error at retrieving order products for the order with ID: ${id}`)
    }
  }

  //   Get All Products Of A Specific Order By It's ID
  async getOrderProductsByID(
    order_id: number | string,
    product_id: number | string
  ): Promise<orderProducts> {
    try {
      const model = await db.connect()
      const result = await model.query(GetProductsOfOrderSQL, [order_id, product_id])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error at retrieving product: ${product_id} in order: ${order_id}`)
    }
  }

  //   Update An Order Products
  async updateOrderProducts(orderProducts: orderProducts): Promise<orderProducts> {
    try {
      const model = await db.connect()
      const current = await this.getOrderProductsByID(
        orderProducts.order_id,
        orderProducts.product_id
      )

      const result = await model.query(UpdateOrderProductsSQL, [
        orderProducts.id || current.id,
        orderProducts.order_id || current.order_id,
        orderProducts.product_id || current.product_id,
        orderProducts.quantity || current.quantity
      ])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Error on updating Products with ID: ${orderProducts.product_id} for order ${orderProducts.order_id}`
      )
    }
  }

  async deleteOrderProducts(
    order_id: number | string,
    product_id: number | string
  ): Promise<orderProducts> {
    try {
      const model = await db.connect()
      const result = await model.query(DeleteOrderProductSQL, [order_id, product_id])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error on deleteing Product with ID: ${product_id} in order ${order_id}`)
    }
  }
}

export default new orderProductsModel()
