## API endpoints

**Users Routes**

   <!-- Table Header -->
   <table>
   <tr> 
   <td>Request Type</td>
   <td>Endpoint</td>
   <td>Params</td>
   <td>Request Body</td>
   <td>Description</td>
   <td>token*</td>
   </tr>

<!-- Create New User Row -->
<tr>
<td>POST</td>
<td>/api/users</td>
<td>N/A</td>
<td>

```json
{
  "email": "mmm066550@gmail.com",
  "first_name": "Moustapha",
  "last_name": "Mahmoud",
  "password": "testPassword123"
}
```

</td>
<td>Create A New User</td>
<td>❌</td>
</tr>

<!-- Get All Users Row -->
<tr>
<td>GET</td>
<td>/api/users</td>
<td>N/A</td>
<td>N/A</td>
<td>Get All Users</td>
<td>✅</td>
</tr>

<!-- Get Specific User By ID Row -->
<tr>
<td>GET</td>
<td>/api/users/:user_id</td>
<td>user_id</td>
<td>N/A</td>
<td>Get User By ID</td>
<td>✅</td>
</tr>

<!-- Update User Row -->
<tr>
<td>PATCH</td>
<td>/api/users/:user_id</td>
<td>user_id</td>
<td>

```json
{
  "email": "mmm066550@gmail.com",
  "first_name": "Moustapha",
  "last_name": "Mahmoud",
  "password": "testPassword123"
}
```

</td>
<td>Update User Information</td>
<td>✅</td>
</tr>

<!-- Delete User Row -->
<tr>
<td>DELETE</td>
<td>/api/users/:user_id</td>
<td>user_id</td>
<td>N/A</td>
<td>Delete User From DB</td>
<td>✅</td>
</tr>

<!-- Auth Row -->
<tr>
<td>POST</td>
<td>/api/users/auth</td>
<td>N/A</td>
<td>

```json
{
  "email": "mmm066550@gmail.com",
  "password": "testPassword123"
}
```

</td>
<td>Login/Authenticate User</td>
<td>❌</td>
</tr>
</table>

**Products Routes**

   <!-- Table Header -->
   <table>
   <tr> 
   <td>Request Type</td>
   <td>Endpoint</td>
   <td>Params</td>
   <td>Request Body</td>
   <td>Description</td>
   <td>token*</td>
   </tr>

<!-- Create New Product Row -->
<tr>
<td>POST</td>
<td>/api/products</td>
<td>N/A</td>
<td>

```json
{
  "title": "product_title",
  "description": "Lorem ipsum dolor sit amet.",
  "quantity": 10,
  "price": 99.99
}
```

</td>
<td>Create A New Product</td>
<td>✅</td>
</tr>

<!-- Get All Products Row -->
<tr>
<td>GET</td>
<td>/api/products</td>
<td>N/A</td>
<td>N/A</td>
<td>Get All Products</td>
<td>✅</td>
</tr>

<!-- Get Specific Product By ID Row -->
<tr>
<td>GET</td>
<td>/api/products/:product_id</td>
<td>product_id</td>
<td>N/A</td>
<td>Get Product By ID</td>
<td>✅</td>
</tr>

<!-- Update Product Row -->
<tr>
<td>PATCH</td>
<td>/api/products/:product_id</td>
<td>product_id</td>
<td>

```json
{
  "title": "changer_product_title",
  "description": "Lorem ipsum dolor sit amet.",
  "quantity": 5,
  "price": 50.35
}
```

</td>
<td>Update Product Information</td>
<td>✅</td>
</tr>

<!-- Delete Product Row -->
<tr>
<td>DELETE</td>
<td>/api/products/:product_id</td>
<td>product_id</td>
<td>N/A</td>
<td>Delete Product From DB</td>
<td>✅</td>
</tr>

</table>

**Orders Routes**

   <!-- Table Header -->
   <table>
   <tr> 
   <td>Request Type</td>
   <td>Endpoint</td>
   <td>Params</td>
   <td>Request Body</td>
   <td>Description</td>
   <td>token*</td>
   </tr>

<!-- Create New Order Row -->
<tr>
<td>POST</td>
<td>/api/orders</td>
<td>N/A</td>
<td>

```json
{
  "status": "pending",
  "user_id": 1
}
```

</td>
<td>Create A New Order</td>
<td>✅</td>
</tr>

<!-- Get All Orders Row -->
<tr>
<td>GET</td>
<td>/api/orders</td>
<td>N/A</td>
<td>N/A</td>
<td>Get All Orders</td>
<td>✅</td>
</tr>

<!-- Get Specific Order By ID Row -->
<tr>
<td>GET</td>
<td>/api/orders/:order_id</td>
<td>order_id</td>
<td>N/A</td>
<td>Get Order By ID</td>
<td>✅</td>
</tr>

<!-- Update Order Row -->
<tr>
<td>PATCH</td>
<td>/api/orders/:order_id</td>
<td>order_id</td>
<td>

```json
{
  "status": "completed",
  "user_id": 1
}
```

</td>
<td>Update Order Information</td>
<td>✅</td>
</tr>

<!-- Delete Order Row -->
<tr>
<td>DELETE</td>
<td>/api/orders/:order_id</td>
<td>order_id</td>
<td>N/A</td>
<td>Delete Order From DB</td>
<td>✅</td>
</tr>

</table>

**Order Products Routes**

   <!-- Table Header -->
   <table>
   <tr> 
   <td>Request Type</td>
   <td>Endpoint</td>
   <td>Params</td>
   <td>Request Body</td>
   <td>Description</td>
   <td>token*</td>
   </tr>

<!-- Create New Order Product Row -->
<tr>
<td>POST</td>
<td>/api/order-products</td>
<td>N/A</td>
<td>

```json
{
  "order_id": "1",
  "product_id": "1",
  "quantity": "1"
}
```

</td>
<td>Add A New Order Product</td>
<td>✅</td>
</tr>

<!-- Get All Order Products Row -->
<tr>
<td>GET</td>
<td>/api/order-products/:id/products</td>
<td>id</td>
<td>N/A</td>
<td>Get All Order Products</td>
<td>✅</td>
</tr>

<!-- Get Specific Order Product By ID Row -->
<tr>
<td>GET</td>
<td>/api/order-products/:id/products/:product_id</td>
<td>id,product_id</td>
<td>N/A</td>
<td>Get Order Product By ID</td>
<td>✅</td>
</tr>

<!-- Update Order Product Row -->
<tr>
<td>PATCH</td>
<td>/api/order-products/:id/products/:product_id</td>
<td>id,product_id</td>
<td>

```json
{
  "order_id": "2",
  "product_id": "2",
  "quantity": "2"
}
```

</td>
<td>Update Order Product Information</td>
<td>✅</td>
</tr>

<!-- Delete Order Product Row -->
<tr>
<td>DELETE</td>
<td>/api/order-products/:id/products/:product_id</td>
<td>id,product_id</td>
<td>N/A</td>
<td>Delete Order Product</td>
<td>✅</td>
</tr>

</table>

## Data Shapes

**Users Table**

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

**Products Table**

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

**Orders Table**

```sql
CREATE TABLE IF NOT EXISTS "orders"(
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    status VARCHAR(128),
    ordered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Order_Products Table**

```sql
CREATE TABLE IF NOT EXISTS "order_products"(
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) NOT NULL,
    product_id BIGINT REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL
);
```
