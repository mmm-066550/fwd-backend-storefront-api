import product from './product.type'

type order_product = {
  id?: number
  order_id: number
  product_id: number
  quantity: number
  products?: product[]
}

export default order_product
