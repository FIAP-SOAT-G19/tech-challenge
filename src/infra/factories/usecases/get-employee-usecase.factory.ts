import { GetEmployeeUseCase } from '@/application/usecases/employee/get-employee.usecase'
import { GetEmployeeGateway } from '@/infra/adapters/gateways/employee/get-employee.gateway'
import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'

const gateway = new GetEmployeeGateway(
  new EmployeeRepository()
)

export const makeGetEmployeeUseCase = (): GetEmployeeUseCase => {
  return new GetEmployeeUseCase(gateway)
}

export const makeGetAllEmployeeUseCase = (): GetEmployeeUseCase => {
  return new GetEmployeeUseCase(gateway)
}
