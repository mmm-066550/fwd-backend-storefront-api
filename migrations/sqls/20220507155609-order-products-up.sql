CREATE TABLE IF NOT EXISTS "order_products"(
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) NOT NULL,
    product_id BIGINT REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL
);