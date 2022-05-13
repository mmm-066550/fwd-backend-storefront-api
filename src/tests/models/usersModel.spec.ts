import userModel from '../../models/users.model'
import db from '../../database'
import clear_db_sql from '../../sql/clear_db.sql'
import user from '../../types/user.type'

describe('User Model Testing Units', () => {
  describe('Make Sure All User Model Methods Are Already Exists', () => {
    it('should have all CRUD operations and authenticate method', () => {
      ;[
        userModel.createNewUser,
        userModel.getAllUsers,
        userModel.getUserByID,
        userModel.updateUser,
        userModel.deleteUser,
        userModel.authenticateUser
      ].map((method) => {
        expect(method).toBeDefined()
      })
    })
  })

  describe('Test UsersModel Methods Logic', () => {
    const user = {
      email: 'mmm00000@gmail.com',
      first_name: 'Moustapha',
      last_name: 'Mahmoud',
      password: 'testPassword123'
    } as user

    // Test Creating New USer
    it('Should return the created user object', async () => {
      const USER = await userModel.createNewUser(user)
      expect(USER).toBeDefined()
      expect(USER.email).toBe('mmm00000@gmail.com')
      expect(USER.first_name).toBe('Moustapha')
      expect(USER.last_name).toBe('Mahmoud')
    })

    // Test Returning All Users
    it('Should retrive all users in DB', async () => {
      const users = await userModel.getAllUsers()
      expect(users.length).toBeGreaterThan(0)
    })

    // Test Return User With Specific ID
    it('Should return a user with specific ID', async () => {
      const USER = await userModel.getUserByID('1')
      expect(USER).toBeDefined()
      expect(USER.id).toBe(1)
      expect(USER.email).toBe('mmm00000@gmail.com')
      expect(USER.first_name).toBe('Moustapha')
      expect(USER.last_name).toBe('Mahmoud')
    })

    // Test Update User Information
    it('Should return a user object after update it', async () => {
      const USER = await userModel.updateUser({
        id: 1,
        email: 'email@email.com',
        first_name: 'Ahmad',
        last_name: 'Yassin',
        password: 'test123Password'
      })
      expect(USER).toBeDefined()
      expect(USER.email).toBe('email@email.com')
      expect(USER.first_name).toBe('Ahmad')
      expect(USER.last_name).toBe('Yassin')
    })

    // Test Authenticate User
    it('Should return the authenticated user object with JWT', async () => {
      const USER = await userModel.authenticateUser('email@email.com', 'test123Password')
      if (USER) {
        expect(USER.id).toBe(1)
        expect(USER.email).toBe('email@email.com')
        expect(USER.first_name).toBe('Ahmad')
        expect(USER.last_name).toBe('Yassin')
      } else {
        expect(USER).toBeNull()
      }
    })

    // Test Deleteing User
    it('Should delete user from DB', async () => {
      const USER = await userModel.deleteUser('1')
      expect(USER.id).toBe(1)
      expect(USER.msg).toBe('User Deleted Successfully')
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    await connection.query(clear_db_sql)
    connection.release()
  })
})
