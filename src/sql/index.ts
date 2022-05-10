// USERS TABLE QUERIES
export const CreteNewUserSQL = `INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at`
export const GetAllUsersSQL = `SELECT id, email, first_name, last_name, created_at FROM users`
export const GetUserByIDSQL = `SELECT id, email, first_name, last_name, created_at FROM users WHERE id=($1)`
