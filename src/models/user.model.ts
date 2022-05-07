import user from '../types/user.type'
import db from '../database'
import { CreteNewUserSQL, GetAllUsersSQL } from '../sql'

// Create Class To Handle Users Model Operations
class User {
  // CREATE A NEW USER
  async createNewUser(user: user): Promise<user> {
    try {
      const model = await db.connect()
      // SQL Code To Create A New Record On USERS Table
      const result = await model.query(CreteNewUserSQL, [
        user.email,
        user.user_name,
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
  async getAllUsers() {
    try {
      const model = await db.connect()
      // SQL Code To GET All Users From USERS Table
      const result = await model.query(GetAllUsersSQL)
      model.release()
      // Return The Created User Credentials
      return result.rows
    } catch (error) {
      throw new Error('Error on getting all users')
    }
  }
}

// Export Model Instance
export default new User()
