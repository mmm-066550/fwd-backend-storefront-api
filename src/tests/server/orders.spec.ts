import supertest from 'supertest'
import server from '../../server'
import user from '../../types/user.type'
import userModel from '../../models/users.model'
import db from '../../database'
import clear_dbSql from '../../sql/clear_db.sql'
import { StatusCodes } from 'http-status-codes'
const req = supertest(server)
let JWT = ''

describe('Orders API Route Endpoints', () => {
  beforeAll(async () => {
    const user = {
      email: 'mmm066550@gmail.com',
      first_name: 'Moustapha',
      last_name: 'Mahmoud',
      password: 'testPassword123'
    } as user
    await userModel.createNewUser(user)
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

  describe('Test Orders Route Endpoints Functions', () => {
    //   Test Creating New Order
    it('should create new order', async () => {
      const res = await req
        .post('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
        .send({
          user_id: '1',
          status: 'active'
        })
      expect(res.status).toBe(StatusCodes.CREATED)
    })

    // Test Getting All Orders From DB
    it('should get all orders', async () => {
      const res = await req
        .get('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
      expect(res.status).toBe(StatusCodes.OK)
      expect(res.body.data.orders.length).toBeGreaterThan(0)
    })

    // Test Getting Order Info By ID
    it('should get order info', async () => {
      const res = await req
        .get('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
      expect(res.status).toBe(StatusCodes.OK)
    })

    //  Test Updateing Order
    it('should update order', async () => {
      const res = await req
        .patch('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
        .send({
          id: 1,
          user_id: 1,
          status: 'completed'
        })
      expect(res.status).toBe(StatusCodes.ACCEPTED)
    })

    // Test Deleting Order
    it('should delete order', async () => {
      const res = await req
        .delete('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
      expect(res.status).toBe(StatusCodes.NO_CONTENT)
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    await connection.query(clear_dbSql)
    connection.release()
  })
})
