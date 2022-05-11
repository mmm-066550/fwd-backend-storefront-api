import jwt from 'jsonwebtoken'
const generateJWT = (payload: unknown): string => {
  const { JWT_SECRET } = process.env
  return jwt.sign({ payload }, JWT_SECRET as unknown as string)
}
export default generateJWT
