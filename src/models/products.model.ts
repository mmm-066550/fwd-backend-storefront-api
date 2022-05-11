import product from '../types/product.type'
import db from '../database'
import {
  CreteNewProductSQL,
  GetAllProductsSQL,
  GetProductByIDSQL,
  UpdateProductSQL,
  DeleteProductSQL
} from '../sql/products.sql'

// Create Class To Handle PRODUCTS Model Operations
class Products {
  // CREATE A NEW PRODUCT
  async createNewProduct(product: product): Promise<product> {
    try {
      const model = await db.connect()
      const result = await model.query(CreteNewProductSQL, [
        product.title,
        product.description,
        product.quantity,
        product.price
      ])
      model.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Error on creating a new product')
    }
  }

  // GET ALL PRODUCTS FROM DB
  async getAllProducts(): Promise<product[]> {
    try {
      const model = await db.connect()
      const result = await model.query(GetAllProductsSQL)
      model.release()
      return result.rows
    } catch (err) {
      throw new Error(`Error on retrieve all products`)
    }
  }

  // GET PRODUCT BY ID
  async getProductByID(id: string): Promise<product> {
    try {
      const model = await db.connect()
      const result = await model.query(GetProductByIDSQL, [id])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error on getting Product with ID: ${id}`)
    }
  }

  // UPDATE A PRODUCT INFORMATION
  async updateProduct(product: product): Promise<product> {
    try {
      const model = await db.connect()
      const current = await this.getProductByID(product.id as string)

      const result = await model.query(UpdateProductSQL, [
        product.id || current.id,
        product.title || current.title,
        product.description || current.description,
        product.quantity || current.quantity,
        product.price || current.price
      ])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error on updating product with ID: ${product.id}`)
    }
  }

  // DELETE A PRODUCT
  async deleteProduct(id: string): Promise<product> {
    try {
      const model = await db.connect()
      const result = await model.query(DeleteProductSQL, [id])
      model.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error on delete product with id: ${id}`)
    }
  }
}

// Export Model Instance
export default new Products()
