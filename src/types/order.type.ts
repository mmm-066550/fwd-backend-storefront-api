import order_product from './order-products.type'

type order = {
  id?: number
  status: string
  userId: number
  ordered_at?: Date
  products?: order_product[]
}

export default order
