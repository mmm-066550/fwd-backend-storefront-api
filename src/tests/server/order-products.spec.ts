import supertest from 'supertest'
import db from '../../database'
import server from '../../server'
import userModel from '../../models/users.model'
import user from '../../types/user.type'
import orderProducts from '../../types/order-products.type'
import order from '../../types/order.type'
import product from '../../types/product.type'
import productModel from '../../models/products.model'
import orderModel from '../../models/orders.model'
import { StatusCodes } from 'http-status-codes'
import clear_dbSql from '../../sql/clear_db.sql'

const req = supertest(server)
let JWT = ''

describe('Order Products API Endpoints', () => {
  const user = {
    email: 'mmm066550@gmail.com',
    first_name: 'Moustapha',
    last_name: 'Mahmoud',
    password: 'testPassword123'
  } as user

  const product = {
    title: 'product_title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, assumenda error? Illum, officiis nulla dicta, delectus non repellendus voluptatibus facere enim a veniam ut perferendis fugiat magni quo error magnam?',
    price: 92.35,
    quantity: 4
  } as product

  const order = {
    user_id: 1,
    status: 'active'
  } as order

  const orderProducts = {
    quantity: 1,
    order_id: 1,
    product_id: 1
  } as orderProducts

  beforeAll(async () => {
    await userModel.createNewUser(user)
    await productModel.createNewProduct(product)
    await orderModel.createNewOrder(order)
  })

  describe('Test User Login And Generate JWT', () => {
    //   Test User Login And Generate JWT
    it('should be able to authenticate to get JWT', async () => {
      const res = await req.post('/api/users/auth').set('Content-type', 'application/json').send({
        email: 'mmm066550@gmail.com',
        password: 'testPassword123'
      })
      expect(res.status).toBe(StatusCodes.OK)
      JWT = res.body.data.token
    })
  })

  describe('Test Order Products Route Endpoints Functions', () => {
    // Test Create New Order Product
    it('should create new order product', async () => {
      const res = await req
        .post('/api/order-products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
        .send(orderProducts)
      expect(res.status).toBe(StatusCodes.CREATED)
    })

    // Test Getting All Products Of An Order
    it('should get all order products', async () => {
      const res = await req
        .get('/api/order-products/1/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
      expect(res.status).toBe(StatusCodes.OK)
      expect(res.body.data.products?.length).toBeGreaterThan(0)
    })

    // Test Deleteing An Order's Product
    it('should delete order', async () => {
      const res = await req
        .delete('/api/order-products/1/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
        .send({
          product_id: 1,
          order_id: 1
        })
      expect(res.status).toBe(StatusCodes.NO_CONTENT)
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    await connection.query(clear_dbSql)
    connection.release()
  })
})
