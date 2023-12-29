export const ramdonStringGenerator = (): string => {
  const max: number = 5
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789'
  let str: string = ''

  for (let i = 0; i <= max; i++) {
    str += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  const timeStamp = new Date().getTime()
  return `${str}-${timeStamp}`
}
