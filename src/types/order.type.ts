import order_product from './order-products.type'

type order = {
  id?: number | string
  status: string
  user_id: number | string
  ordered_at?: Date
  products?: order_product[]
}

export default order
