export interface IEncrypt {
  encrypt: (value: string) => string
  compare: (value: string, valueToCompare: string) => Promise<boolean>
}
