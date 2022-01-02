import { IUseCases } from '../../../src/usecases/register-user-on-mailing-list/ports'

class ErrorThrowingUseCaseStub implements IUseCases {
  perform(_: any): Promise<any> {
    throw new Error('Error stub')
  }
}

export { ErrorThrowingUseCaseStub }
