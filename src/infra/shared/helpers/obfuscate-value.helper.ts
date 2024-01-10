const valuesToBeObfuscated = ['password', 'passwordConfirmation']

export const obfuscateValue = (object: any): object => {
  valuesToBeObfuscated.forEach(word => {
    if (word in object) {
      object[word] = '[OBFUSCATED]'
    }

    if (object.creditCard) {
      object.creditCard = {
        brand: '[OBFUSCATED]',
        number: '[OBFUSCATED]',
        cvv: '[OBFUSCATED]',
        expiryMonth: '[OBFUSCATED]',
        expiryYear: '[OBFUSCATED]'
      }
    }
  })

  return object
}
