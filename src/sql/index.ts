// USERS TABLE QUERIES
export const CreteNewUserSQL = `INSERT INTO users (email, user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`
export const GetAllUsersSQL = `SELECT * FROM users`
