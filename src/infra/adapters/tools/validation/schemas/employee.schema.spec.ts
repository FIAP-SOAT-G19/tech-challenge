import { employeeSchema } from './employee.schema'

describe('employeeSchema', () => {
  test('should be a valid Joi schema', () => {
    const validEmployeeData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12345678901',
      password: 'password123'
    }

    const { error } = employeeSchema.validate(validEmployeeData)

    expect(error).toBeUndefined()
  })

  test('should reject invalid data', () => {
    const invalidEmployeeData = {
      name: 'Jo',
      email: 'invalidemail',
      cpf: '123456789',
      password: 'short'
    }

    const { error } = employeeSchema.validate(invalidEmployeeData)

    expect(error).toBeDefined()
  })
})
