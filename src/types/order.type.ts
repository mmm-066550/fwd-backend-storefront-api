import order_product from './order-products.type'

type order = {
  id?: number | string
  status: string
  user_id: number
  ordered_at?: Date
  products?: order_product[]
}

export default order
