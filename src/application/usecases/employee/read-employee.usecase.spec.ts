import { ReadEmployeeUseCase } from './read-employee.usecase'
import { IEmployeeRepository } from '@/application/interfaces/repositories/employee.interface'
import { mock } from 'jest-mock-extended'

const employeeRepository = mock<IEmployeeRepository>()

describe('ReadEmployeeUseCase', () => {
  let sut: ReadEmployeeUseCase

  beforeEach(() => {
    sut = new ReadEmployeeUseCase(employeeRepository)
  })

  describe('findOne', () => {
    test('should return an employee when found by ID', async () => {
      const input = {
        id: 'employeeId'
      }

      const foundEmployee = {
        id: 'employeeId',
        name: 'John Doe',
        email: 'johndoe@example.com',
        cpf: '1234567890',
        password: 'password123',
        createdAt: new Date('2021-09-21T22:00:00.000Z'),
        updatedAt: new Date('2021-09-21T22:00:00.000Z'),
        deletedAt: new Date()
      }

      employeeRepository.findById.mockResolvedValue(foundEmployee)

      const result = await sut.findOne(input)

      expect(result).toEqual({
        id: 'employeeId',
        name: 'John Doe',
        email: 'johndoe@example.com',
        cpf: '1234567890',
        createdAt: new Date('2021-09-21T22:00:00.000Z'),
        updatedAt: new Date('2021-09-21T22:00:00.000Z')
      })
    })
  })

  describe('findAll', () => {
    test('should return a list of employees when found', async () => {
      const foundEmployees = [
        {
          id: 'employeeId1',
          name: 'John Doe',
          email: 'johndoe@example.com',
          cpf: '1234567890',
          password: 'password123',
          createdAt: new Date('2021-09-21T22:00:00.000Z'),
          updatedAt: new Date('2021-09-21T22:00:00.000Z'),
          deletedAt: new Date()
        },
        {
          id: 'employeeId2',
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          cpf: '0987654321',
          password: 'password123',
          createdAt: new Date('2021-09-21T22:00:00.000Z'),
          updatedAt: new Date('2021-09-21T22:00:00.000Z'),
          deletedAt: new Date()
        }
      ]

      employeeRepository.findAll.mockResolvedValue(foundEmployees)

      const result = await sut.findAll()

      expect(result).toEqual([
        {
          id: 'employeeId1',
          name: 'John Doe',
          email: 'johndoe@example.com',
          cpf: '1234567890',
          createdAt: new Date('2021-09-21T22:00:00.000Z'),
          updatedAt: new Date('2021-09-21T22:00:00.000Z')
        },
        {
          id: 'employeeId2',
          name: 'Jane Smith',
          email: 'janesmith@example.com',
          cpf: '0987654321',
          createdAt: new Date('2021-09-21T22:00:00.000Z'),
          updatedAt: new Date('2021-09-21T22:00:00.000Z')
        }
      ])
    })

    test('should return an empty list when no employees are found', async () => {
      employeeRepository.findAll.mockResolvedValue([])

      const result = await sut.findAll()

      expect(result).toEqual([])
    })
  })
})
