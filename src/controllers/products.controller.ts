import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import productsModel from '../models/products.model'

class productsController {
  // Create New Product
  async createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Filter Request Body
      const { title, description, quantity, price } = req.body
      const productSpecs = { title, description, quantity, price }

      // Make Sure That all Fields That Are Needed To Create A Product Is Valid
      if (!title || !description || !quantity || !price) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: 'Please enter all required fields to create a product'
        })
      }

      // Check IF Product Is Already Added Before
      const products = await productsModel.getAllProducts()

      if (products.find((product) => product.title === title)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: 'BAD_REQUEST', message: 'This product is already added before' })
      } else {
        // Add New Product To DB
        const product = await productsModel.createNewProduct(productSpecs)

        // Rerurn Results
        return res
          .status(StatusCodes.CREATED)
          .json({ status: 'CREATED', message: 'product created successfully', data: { product } })
      }
    } catch (err) {
      next(err)
    }
  }

  // Get All Products From DB
  async getAllProducts(_: Request, res: Response, next: NextFunction) {
    try {
      const products = await productsModel.getAllProducts()
      // Rerurn Results
      res.status(StatusCodes.OK).json({
        status: 'SUCCESS',
        message: `${products.length} Products retrievied successfully`,
        data: { products }
      })
    } catch (err) {
      next(err)
    }
  }

  // Get Product By ID
  async getProductByID(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.product_id
      const product = await productsModel.getProductByID(id)
      // Rerurn Results
      if (product) {
        return res.status(StatusCodes.OK).json({
          status: 'SUCCESS',
          message: 'Product retrievied successfully',
          data: { product }
        })
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `Error on find a product with the ID: ${id}, , May be no product found with this ID`
        })
      }
    } catch (err) {
      next(err)
    }
  }

  // Update A Product Information
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.product_id

      // Filter Request Body
      const { title, description, quantity, price } = req.body
      const productSpecs = { id, title, description, quantity, price }

      const isProductExists = await productsModel.getProductByID(id)
      if (!isProductExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `There is not found product with this ID: ${id}`
        })
      }

      // Check IF No Provided Info To Update
      if (!title && !description && !quantity && !quantity && !price) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: 'Please provide fields that you need to update the product'
        })
      } else {
        const product = await productsModel.updateProduct(productSpecs)
        // Rerurn Results
        if (product) {
          return res.status(StatusCodes.ACCEPTED).json({
            status: 'SUCCESS',
            message: 'Product information updated successfully',
            data: { product }
          })
        } else {
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'BAD_REQUEST',
            message: `Error on update the product with the ID: ${id}`
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  // Delete A Product
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.product_id
      const product = await productsModel.deleteProduct(id)

      // Rerurn Results
      if (product) {
        return res
          .status(StatusCodes.NO_CONTENT)
          .json({ status: 'SUCCESS', message: 'Product deleted successfully', data: { product } })
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: 'BAD_REQUEST',
          message: `Error on delete the product with the ID: ${id}, May be no product found with this ID`
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

export default new productsController()
