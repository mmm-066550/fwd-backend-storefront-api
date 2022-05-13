export default `
DELETE FROM order_products;\n
ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n
DELETE FROM orders;\n
ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n
DELETE FROM products;\n
ALTER SEQUENCE products_id_seq RESTART WITH 1;\n
DELETE FROM users;\n
ALTER SEQUENCE users_id_seq RESTART WITH 1;\n
`
