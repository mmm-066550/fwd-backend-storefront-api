import product from '../types/product.type'
import db from '../database'

// Create Class To Handle PRODUCTS Model Operations
class Products {
  // CREATE A NEW Product
  async createNewProduct(product: product): Promise<product> {
    try {
      const model = await db.connect()
      // SQL Code To Create A New Record On USERS Table
      const result = await model.query(product.title, ['_'])
      model.release()
      // Return The Created User Credentials
      return result.rows[0]
    } catch (error) {
      throw new Error('Error on creating a new product')
    }
  }
}

// Export Model Instance
export default new Products()
