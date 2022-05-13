import productModel from '../../models/products.model'
import product from '../../types/product.type'
import db from '../../database'
import clear_db_sql from '../../sql/clear_db.sql'

describe('Product Model Testing Units', () => {
  describe('Make Sure All Products Model Methods Are Already Exists', () => {
    it('should have all CRUD operations', () => {
      ;[
        productModel.createNewProduct,
        productModel.getAllProducts,
        productModel.getProductByID,
        productModel.updateProduct,
        productModel.deleteProduct
      ].map((method) => {
        expect(method).toBeDefined()
      })
    })
  })

  describe('Test ProductsModel Methods Logic', () => {
    const product = {
      title: 'product_title',
      description: 'product description',
      price: 24.35,
      quantity: 20
    } as product

    // Test Creating New Product
    it('Should add a product and return it as an object', async () => {
      const PRODUCT = await productModel.createNewProduct(product)
      expect(PRODUCT).toBeDefined()
      expect(PRODUCT.title).toBe(product.title)
      expect(PRODUCT.description).toBe(product.description)
      expect(PRODUCT.quantity).toBe(product.quantity)
      expect(PRODUCT.price).toBe(String(product.price))
    })

    // Test Retreving All Products
    it('Should return all products in the DB', async () => {
      const products = await productModel.getAllProducts()
      expect(products.length).toBeGreaterThan(0)
    })

    // Test Return Product With Specific ID
    it('Should return a Product with specific ID', async () => {
      const PRODUCT = await productModel.getProductByID('1')
      expect(PRODUCT).toBeDefined()
      expect(PRODUCT.title).toBe(product.title)
      expect(PRODUCT.description).toBe(product.description)
      expect(PRODUCT.quantity).toBe(product.quantity)
      expect(PRODUCT.price).toBe(String(product.price))
    })

    // Test Update Product Information
    it('Should return a product object after update it', async () => {
      const updateProduct = {
        id: 1,
        title: 'changet_product_title',
        description: 'changed product description',
        price: 10.65,
        quantity: 5
      }
      const PRODUCT = await productModel.updateProduct(updateProduct)
      expect(PRODUCT.title).toBe(updateProduct.title)
      expect(PRODUCT.description).toBe(updateProduct.description)
      expect(PRODUCT.price).toBe(String(updateProduct.price))
      expect(PRODUCT.quantity).toBe(updateProduct.quantity)
    })

    // Test Delete Product
    it('Delete method should remove the product', async () => {
      const PRODUCT = await productModel.deleteProduct('1')
      expect(PRODUCT.id).toBe(1)
    })
  })

  afterAll(async () => {
    const connection = await db.connect()
    await connection.query(clear_db_sql)
    connection.release()
  })
})
