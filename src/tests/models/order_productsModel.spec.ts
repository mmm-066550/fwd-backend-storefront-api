import db from '../../database'
import user from '../../types/user.type'
import product from '../../types/product.type'
import order from '../../types/order.type'
import orderProduct from '../../types/order-products.type'
import userModel from '../../models/users.model'
import productModel from '../../models/products.model'
import orderproductModel from '../../models/orders-products.model'
import orderModel from '../../models/orders.model'
import clear_db_sql from '../../sql/clear_db.sql'

describe('Order Products Model Testing Units', () => {
  describe('Make Sure All Order Products Model Methods Are Already Exists', () => {
    it('should have all CRUD operations', () => {
      ;[
        orderproductModel.createNewOrderProducts,
        orderproductModel.getAllOrderProducts,
        orderproductModel.getOrderProductsByID,
        orderproductModel.updateOrderProducts,
        orderproductModel.deleteOrderProducts
      ].map((method) => {
        expect(method).toBeDefined()
      })
    })
  })

  describe('Test order products Model logic', () => {
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

    const orderproduct = {
      quantity: 1,
      order_id: 1,
      product_id: 1
    } as orderProduct

    beforeAll(async () => {
      await userModel.createNewUser(user)
      await productModel.createNewProduct(product)
      await orderModel.createNewOrder(order)
    })

    // Test Creatin New Order Product
    it('Should return an order product object after createing it', async () => {
      const Order_Product = await orderproductModel.createNewOrderProducts(orderproduct)
      expect(Order_Product).toBeDefined()
    })

    //  Test Getting All Products Of An Order
    it('Should return a list of products of an order', async () => {
      const Order_Product = await orderproductModel.getAllOrderProducts(1)
      expect(Order_Product.length).toBeGreaterThan(0)
    })

    // Test Getting Specific Product Of An Specific Order By IDs
    it('Should return the correct product in a specific order', async () => {
      const Order_Product = await orderproductModel.getOrderProductsByID(1, 1)
      expect(Order_Product).toBeDefined()
    })

    // Test Update Order Product
    it('Should return a order after update it', async () => {
      const Order_Product = await orderproductModel.updateOrderProducts({
        id: 1,
        quantity: 34,
        order_id: 1,
        product_id: 1
      })
      expect(Order_Product.quantity).toEqual(34)
    })

    // Test Delete Product From An Order
    it('Should delete products from list of product in order', async () => {
      const Order_Product = await orderproductModel.deleteOrderProducts(1, 1)
      expect(Order_Product.id).toBe(1)
    })

    afterAll(async () => {
      const connection = await db.connect()
      await connection.query(clear_db_sql)
      connection.release()
    })
  })
})
