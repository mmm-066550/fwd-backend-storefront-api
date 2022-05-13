// ORDERS PRODUCTS TABLE QUERIES
export const CreteNewOrderProductsSQL = `INSERT INTO order_products (order_id, product_id, quantity) values ($1, $2, $3) RETURNING *`
export const GetOrderAllProductsSQL = `SELECT o.id AS id, op.order_id, op.product_id, JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'title', p.title, 'description', p.description, 'price', p.price, 'quantity', op.quantity)) AS products FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id WHERE o.id=$1 GROUP BY o.id, op.order_id, op.product_id`
export const GetProductsOfOrderSQL = `SELECT op.order_id::INTEGER AS id, op.order_id::INTEGER AS "order_id", op.product_id::INTEGER AS "productId", op.quantity, p.title, p.description, p.price::INTEGER FROM order_products AS op JOIN products AS p ON p.id=op.product_id WHERE order_id=$1 AND product_id=$2`
export const UpdateOrderProductsSQL = `UPDATE order_products SET quantity=$4, order_id=$2, product_id=$3 WHERE id=$1 RETURNING *`
export const DeleteOrderProductSQL = `DELETE FROM order_products WHERE order_id=($1) and product_id=($2) RETURNING *`
