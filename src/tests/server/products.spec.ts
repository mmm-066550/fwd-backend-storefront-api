import supertest from 'supertest'
import db from '../../database'
import server from '../../server'
import user from '../../types/user.type'
import userModel from '../../models/users.model'
import { StatusCodes } from 'http-status-codes'
import clear_dbSql from '../../sql/clear_db.sql'

const req = supertest(server)
let JWT = ''

describe('Products API Route Endpoints', () => {
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

  describe('Test Products Route Endpoints Functions', () => {
    it('should create new product', async () => {
      const res = await req
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
        .send({
          id: 1,
          title: 'product_title',
          description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus saepe qui nihil modi eaque quis voluptatem amet iure debitis sunt, fugit repellendus odio mollitia nobis sequi praesentium. Iure, hic ex.',
          price: 12.9,
          quantity: 4
        })
      expect(res.status).toBe(StatusCodes.CREATED)
    })

    it('should get all products from DB', async () => {
      const res = await req
        .get('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
      expect(res.status).toBe(StatusCodes.OK)
      expect(res.body.data.products.length).toBeGreaterThan(0)
    })

    it('should get product', async () => {
      const res = await req
        .get('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
      expect(res.status).toBe(StatusCodes.OK)
    })

    it('should update product info', async () => {
      const res = await req
        .patch('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
        .send({
          id: 1,
          title: 'different_product_title',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus culpa nostrum dolore consequuntur alias nemo dolorum. Debitis natus itaque delectus labore, aliquid magnam nam veniam dolorem quos eum',
          price: 46.75,
          quantity: 2
        })
      expect(res.status).toBe(StatusCodes.ACCEPTED)
    })

    it('should delete product', async () => {
      const res = await req
        .delete('/api/products/1')
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
