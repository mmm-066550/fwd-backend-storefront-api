import supertest from 'supertest'
import server from '../../server'
import userModel from '../../models/users.model'
import User from '../../types/user.type'
import db from '../../database'
import clear_dbSql from '../../sql/clear_db.sql'
import { StatusCodes } from 'http-status-codes'

const req = supertest(server)
let JWT = ''

describe('Users API Route Endpoints', () => {
  beforeAll(async () => {
    const model = await db.connect()
    await model.query(clear_dbSql)
    model.release()

    // Create new user for testings
    const user = {
      email: 'mmm066550@gmail.com',
      first_name: 'Moustapha',
      last_name: 'Mahmoud',
      password: 'testPassword123'
    } as User
    await userModel.createNewUser(user)
  })

  describe('Test User Route Endpoints Functions', () => {
    //   Test User Login And Generate JWT
    it('should be able to authenticate to get JWT', async () => {
      const res = await req.post('/api/users/auth').set('Content-type', 'application/json').send({
        email: 'mmm066550@gmail.com',
        password: 'testPassword123'
      })
      expect(res.status).toBe(StatusCodes.OK)
      JWT = res.body.data.token
    })

    //   Test Creating A new User
    it('should create new user', async () => {
      const res = await req.post('/api/users').set('Content-type', 'application/json').send({
        email: 'testemail@gmail.com',
        first_name: 'firstName',
        last_name: 'lastName',
        password: 'testPassword123'
      })
      expect(res.status).toBe(StatusCodes.CREATED)
    })

    // Test Getting All Users Form DB
    it('should get all users in the DB', async () => {
      const res = await req
        .get('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
      expect(res.status).toBe(StatusCodes.OK)
      expect(res.body.data.users.length).toBeGreaterThan(0)
    })

    // Test Getting One User Info From DB
    it('should get user by his ID', async () => {
      const res = await req
        .get('/api/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
      expect(res.status).toBe(StatusCodes.OK)
    })

    // Test Update User Info
    it('should update user', async () => {
      const res = await req
        .patch('/api/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${JWT}`)
        .send({
          id: 2,
          email: 'mmm06655000@gmail.com',
          first_name: 'Moustapha1',
          last_name: 'Mahmoud1',
          password: 'testPassword321'
        })
      expect(res.status).toBe(StatusCodes.ACCEPTED)
    })

    // Test Deleting User
    it('should delete user', async () => {
      const res = await req
        .delete('/api/users/1')
        .set('Authorization', `Bearer ${JWT}`)
        .set('Content-type', 'application/json')
      expect(res.status).toBe(StatusCodes.NO_CONTENT)
    })
  })

  // Trunc DB After Finish All Tests
  afterAll(async () => {
    const model = await db.connect()
    await model.query(clear_dbSql)
    model.release()
  })
})
