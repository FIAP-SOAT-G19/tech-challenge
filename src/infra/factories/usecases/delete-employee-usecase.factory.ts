import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { DeleteEmployeeGateway } from './../../adapters/gateways/employee/delete-employee.gateway'
import { DeleteEmployeeUseCase } from '@/application/usecases/employee/delete-employee.usecase'

export const makeDeleteEmployeeUseCase = (): DeleteEmployeeUseCase => {
  const gateway = new DeleteEmployeeGateway(
    new EmployeeRepository()
  )
  return new DeleteEmployeeUseCase(gateway)
}
