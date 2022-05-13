## API endpoints

1. **Users Routes**
<table>
<tr> 
<td> Request Type </td> <td> Endpoint </td><td> Params </td><td>Request Body</td><td> Description </td> 
</tr>
<tr>
<td> GET </td><td>/users</td><td>-</td><td> - </td> <td> show all the available users </td>
</tr>
<tr>
<td> GET </td><td>/users/:id</td><td>user id</td> <td> - </td> <td> get user by his id </td>
</tr>
<tr>
<td> DELETE </td><td>/users/:id</td><td>user id</td><td> - </td> <td> delete user by his id </td>
</tr>
<tr>
<td> PUT </td><td>/users/:id</td><td>user id</td>
<td>

```json
{
  "firstname": "yousef",
  "lastname": "meska",
  "password": "0000",
  "email": "test@test.com"
}
```

</td>
<td> delete user by his id </td>
</tr>
<tr>
<td> POST </td><td>/users/signup</td><td>-</td>
<td>

```json
{
  "firstname": "yousef",
  "lastname": "meska",
  "password": "0000",
  "email": "test@test.com"
}
```

</td>
<td> create/signup user</td>
</tr>

<tr>
<td> POST </td><td>/users/login</td><td></td>
<td>

```json
{
  "email": "test@test.com",
  "password": "0000"
}
```

 </td> <td>login/authenticate user</td>
</tr>
</table>

<!-- <table>
<tr>
<td> GET </td><td>/products</td><td>-</td> <td> - </td> <td>Get all the available products</td>
</tr>

<tr>
<td> GET </td><td>/products/:id</td><td>product id</td> <td> - </td> <td> get product by it's id </td>
</tr>

<tr>
<td> DELETE </td><td>/products/:id</td><td>product id</td> <td> - </td> <td> delete product by it's id</td>
</tr>

<tr>
<td> POST </td><td>/products/create</td><td>-</td>
<td>

```json
{
  "name": "product_name",
  "price": 13,
  "category": "product_category"
}
```

</td> <td> create a new product</td>
</tr>

<tr>
<td> PUT </td><td>/products</td><td>-</td>
<td>

```json
{
  "id": 1,
  "name": "another_name",
  "price": 24,
  "category": "another_category"
}
```

</td> <td> update product by it's id</td>
</tr>

<tr>
<td> GET </td><td>/products/:category</td><td>category</td> <td> - </td> <td> get products by category name</td>
</tr>

<tr>
<td> GET </td><td>/products</td><td>-</td> <td> - </td> <td>get all available orders</td>
</tr>

<tr>
<td> GET </td><td>/orders/:id</td><td>order id</td> <td> - </td> <td> get order by it's id</td>
</tr>

<tr>
<td> DELETE </td><td>/order/:id</td><td>order id</td> <td> - </td> <td> delete order by it's id</td>
</tr>

<tr>
<td> GET </td><td>/orders/users/current/:user_id</td><td>user id</td> <td> - </td> <td> get the current order for user by user id</td>
</tr>

<tr>
<td> GET </td><td>/orders/users/open/:user_id</td><td>user id</td> <td> - </td> <td>get open orders for user by user is</td>
</tr>

<tr>
<td>GET </td><td>/orders/users/closed/:user_id</td><td>user id</td><td>-</td><td>get closed orders for user by user id</td>
</tr>

<tr>
<td>GET </td><td>/orders/users/:user_id</td><td>user id</td><td>-</td><td>get all orders for the user by it's it</td>
</tr>

<tr>
<td>POST</td><td>/orders/create</td><td>-</td><td>

```json
{
  "user_id": 1,
  "status": "open"
}
```

</td>
<td>create order for the user [user_id]</td>
</tr>
<tr>
<td>PUT</td><td>/order/:id?status=</td><td>order id, status as query string</td><td>-</td><td>update order status for the user</td>
</tr>
<tr>

<td>GET</td><td>/order-products/:orderId/products</td>order id </td> <td> - </td> <td>-</td><td>Get all products on an order by order it</td>
</tr>

<tr>
<td>PUT</td><td>/orders-products/:orderId</td><td>order id</td>
<td>

```json
{
  "product_id": 1,
  "order_id": 2,
  "quantity": 12
}
```

</td>
<td> update an order </td>
</tr>

<>

<td>DELETE </td><td>/order-products/:orderId/:productId</td><td>orderId, productId</td><td>-</td><td>DELETE product from specific order</td>

</tr>
</table> -->

## Data Shapes

1. **Users Table**

```sql
CREATE TABLE IF NOT EXISTS "users"(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) UNIQUE,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

2. **Products Table**

```sql
CREATE TABLE IF NOT EXISTS "products"(
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL,
    price NUMERIC(11, 2) NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

3. **Orders Table**

```sql
CREATE TABLE IF NOT EXISTS "orders"(
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    status VARCHAR(128),
    ordered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

4. **Order_Products Table**

```sql
CREATE TABLE IF NOT EXISTS "order_products"(
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) NOT NULL,
    product_id BIGINT REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL
);
```
