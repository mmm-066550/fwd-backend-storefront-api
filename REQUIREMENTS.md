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
  "title": "product",
  "description": "Lorem ipsum dolor sit amet.",
  "quantity": 10,
  "price": 99.99
}
```

</td>
<td>Create A New Product</td>
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
