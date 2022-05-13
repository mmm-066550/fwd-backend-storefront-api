import user from '../types/user.type'
import db from '../database'
import {
  CreteNewUserSQL,
  GetAllUsersSQL,
  GetUserByIDSQL,
  UpdateUserSQL,
  DeleteUserSQL,
  AuthenticateUserSQL,
  GetUserByEmailSQL
} from '../sql/users.sql'
import hashPasswords from '../utils/hashPasswords'
import comparePassword from '../utils/comparePassword'

// Create Class To Handle Users Model Operations
class Users {
  // CREATE A NEW USER
  async createNewUser(user: user): Promise<user> {
    try {
      const model = await db.connect()
      const result = await model.query(CreteNewUserSQL, [
        user.email,
        user.first_name,
        user.last_name,
        hashPasswords(user.password as string)
      ])
      model.release()
      // Return The Created User Credentials
      return result.rows[0]
    } catch (error) {
      throw new Error('Error on creating a new user')
    }
  }

  // GET ALL USERS
  async getAllUsers(): Promise<user[]> {
    try {
      const model = await db.connect()
      // SQL Code To GET All Users From USERS Table
      const result = await model.query(GetAllUsersSQL)
      model.release()
      // Return The Users
      return result.rows
    } catch (error) {
      throw new Error('Error on getting all users')
    }
  }

  // GET USER BY ID
  async getUserByID(id: string): Promise<user> {
    try {
      const model = await db.connect()
      // SQL Code To GET All Users From USERS Table
      const result = await model.query(GetUserByIDSQL, [id])
      model.release()
      // Return The Users
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error on getting user with id: ${id}`)
    }
  }

  // UPDATE A USER INFORMATION
  async updateUser(user: user): Promise<user> {
    try {
      const model = await db.connect()
      const current = await this.getUserByID(user.id as string)
      const result = await model.query(UpdateUserSQL, [
        user.id || current.id,
        user.email || current.email,
        user.first_name || current.first_name,
        user.last_name || current.last_name,
        hashPasswords(user.password as string) || current.password
      ])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error on updating user with id: ${user.id}`)
    }
  }

  // DELETE A USER
  async deleteUser(id: string): Promise<user> {
    try {
      const model = await db.connect()
      const result = await model.query(DeleteUserSQL, [id])
      model.release()
      return { ...result.rows[0], msg: 'User Deleted Successfully' }
    } catch (err) {
      throw new Error(`Error on delete user with id: ${id}`)
    }
  }

  // AUTHENTICATE A USER
  async authenticateUser(email: string, password: string): Promise<user | null> {
    try {
      const model = await db.connect()
      const result = await model.query(AuthenticateUserSQL, [email])

      if (result.rows.length) {
        const hashedPassword = result.rows[0].password
        const isCorrectPassword = comparePassword(hashedPassword, password)

        if (isCorrectPassword) {
          const user = await model.query(GetUserByEmailSQL, [email])
          return user.rows[0]
        }
      }
      model.release()
      return null
    } catch (error) {
      throw new Error(`Error on authenticate`)
    }
  }
}

// Export Model Instance
export default new Users()
