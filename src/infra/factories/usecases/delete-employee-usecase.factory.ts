import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { DeleteEmployeeGateway } from './../../adapters/gateways/employee/delete-employee.gateway'
import { DeleteEmployeeUseCase } from '@/application/usecases/employee/delete-employee.usecase'

const gateway = new DeleteEmployeeGateway(
  new EmployeeRepository()
)

export const makeDeleteEmployeeUseCase = (): DeleteEmployeeUseCase => {
  return new DeleteEmployeeUseCase(gateway)
}
