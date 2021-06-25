import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { classToPlain } from 'class-transformer'

class ListUsersService {
  async execute (): Promise<Record<string, any>> {
    const usersRepository = getCustomRepository(UserRepository)

    const users = await usersRepository.find()
    return classToPlain(users)
  }
}

export { ListUsersService }
