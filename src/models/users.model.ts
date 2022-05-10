import user from '../types/user.type'
import db from '../database'
import { CreteNewUserSQL, GetAllUsersSQL, GetUserByIDSQL } from '../sql'

// Create Class To Handle Users Model Operations
class Users {
  // CREATE A NEW USER
  async createNewUser(user: user): Promise<user> {
    try {
      const model = await db.connect()
      // SQL Code To Create A New Record On USERS Table
      const result = await model.query(CreteNewUserSQL, [
        user.email,
        user.first_name,
        user.last_name,
        user.password
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

  // GET ALL USERS
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
}

// Export Model Instance
export default new Users()
