import product from './product.type'

type order_product = {
  id?: number | string
  order_id: number | string
  product_id: number | string
  quantity?: number | string
  products?: product[]
}

export default order_product
