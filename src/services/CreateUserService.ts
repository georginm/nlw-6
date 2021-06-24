import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { hash } from 'bcryptjs'

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

class CreateUserService {
  async execute ({ name, email, password, admin = false }: IUserRequest): Promise<IUserRequest> {
    const userRepository = getCustomRepository(UserRepository)

    if (!email) {
      throw new Error('Invalid email')
    }

    const userAlreadyExists = await userRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    })

    await userRepository.save(user)

    return user
  }
}

export { CreateUserService }
