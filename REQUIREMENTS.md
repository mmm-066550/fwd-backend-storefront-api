## API endpoints

<table>
<tr> 
<td> Request Type </td> <td> Endpoint </td><td> Params </td><td>Request Body</td><td> Description <td> </tr>

</table>

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
