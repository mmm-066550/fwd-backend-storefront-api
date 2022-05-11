import bcrypt from 'bcrypt'

export default (password: string) => {
  const { BCRYPT_SALT, BCRYPT_SECRET } = process.env
  return bcrypt.hashSync(
    `${password}${BCRYPT_SECRET}`,
    parseInt(BCRYPT_SALT as unknown as string, 10)
  )
}
