// USERS TABLE QUERIES
export const CreteNewUserSQL = `INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at`
export const GetAllUsersSQL = `SELECT id, email, first_name, last_name, created_at FROM users`
export const GetUserByIDSQL = `SELECT id, email, first_name, last_name, created_at FROM users WHERE id=($1)`
export const GetUserByEmailSQL = `SELECT id, email, first_name, last_name, created_at FROM users WHERE email=($1)`
export const UpdateUserSQL = `UPDATE users SET email=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$1 RETURNING id, email, first_name, last_name, password`
export const DeleteUserSQL = `DELETE FROM users WHERE id=($1) RETURNING *`
export const AuthenticateUserSQL = `SELECT password FROM users WHERE email=$1`
