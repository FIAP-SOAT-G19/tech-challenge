import bcrypt from 'bcrypt'

export function cryptoPassword(password: string): string {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(password, salt)
}
