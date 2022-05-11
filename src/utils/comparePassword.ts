import bcrypt from 'bcrypt'
const comparePassword = (hashedPassword: string, password: string): boolean => {
  const { BCRYPT_SECRET } = process.env
  return bcrypt.compareSync(`${password}${BCRYPT_SECRET}`, hashedPassword)
}
export default comparePassword
