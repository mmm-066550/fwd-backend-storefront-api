import db from '../../database'
import user from '../../types/user.type'
import product from '../../types/product.type'
import order from '../../types/order.type'
import orderModel from '../../models/orders.model'
import userModel from '../../models/users.model'
import productModel from '../../models/products.model'
import clear_db_sql from '../../sql/clear_db.sql'

describe('Orders Model Testing Units', () => {
  describe('Make Sure All Orders Model Methods Are Already Exists', () => {
    it('should have all CRUD operations', () => {
      ;[
        orderModel.createNewOrder,
        orderModel.getAllOrders,
        orderModel.getAllOrdersOfUserByID,
        orderModel.getOrderByID,
        orderModel.updateOrder,
        orderModel.deleteOrder
      ].map((method) => {
        expect(method).toBeDefined()
      })
    })
  })

  describe('Test OrdersModel Methods Logic', () => {
    const user = {
      email: 'mmm00000@gmail.com',
      first_name: 'Moustapha',
      last_name: 'Mahmoud',
      password: 'testPassword123'
    } as user

    const product = {
      title: 'product_title',
      description: 'product description',
      price: 24.35,
      quantity: 20
    } as product

    const order = {
      user_id: 1,
      status: 'active'
    } as order

    beforeAll(async () => {
      await userModel.createNewUser(user)
      await productModel.createNewProduct(product)
    })

    // Test Creating New Order
    it('Should create a new order and return it', async () => {
      const ORDER = await orderModel.createNewOrder(order)
      expect(ORDER.id).toEqual(1)
      expect(ORDER.user_id).toBe(String(order.user_id))
      expect(ORDER.status).toEqual(order.status)
    })

    // Test Getting All Orders
    it('Should return a list of orders', async () => {
      const orders = await orderModel.getAllOrders()
      expect(orders.length).toBeGreaterThan(0)
    })

    // Test Getting Order By It's ID
    it('Should return the correct order with specific ID', async () => {
      const ORDER = await orderModel.getOrderByID('1')
      expect(ORDER.id).toEqual(1)
      expect(ORDER.status).toEqual(order.status)
      expect(ORDER.user_id).toEqual(String(order.user_id))
    })

    // Test Getting All Order Of User By His ID
    it('Should return the correct order with specific user', async () => {
      const ORDER = await orderModel.getAllOrdersOfUserByID('1')
      expect(ORDER).toBeDefined()
    })

    // Test Update Order
    it('Should return an order after update it', async () => {
      const ORDER = await orderModel.updateOrder('1', {
        user_id: 1,
        status: 'completed'
      })
      expect(ORDER?.status).toBe('completed')
    })

    // Test Delete Order
    it('Should delete order from DB', async () => {
      const ORDER = await orderModel.deleteOrder('1')
      expect(ORDER.id).toBe(1)
    })

    afterAll(async () => {
      const connection = await db.connect()
      await connection.query(clear_db_sql)
      connection.release()
    })
  })
})
