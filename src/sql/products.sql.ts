// PRODUCTS TABLE QUERIES
export const CreteNewProductSQL = `INSERT INTO products (title, description, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *`
export const GetAllProductsSQL = `SELECT * FROM products`
export const GetProductByIDSQL = `SELECT * FROM products WHERE id=($1)`
export const UpdateProductSQL = `UPDATE products SET title=$2, description=$3, quantity=$4, price=$5 WHERE id=$1 RETURNING *`
export const DeleteProductSQL = `DELETE FROM products WHERE id=($1) RETURNING *`
