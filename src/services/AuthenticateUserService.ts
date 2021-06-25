import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateUserService{
  email: string
  password: string
}

class AuthenticateUserService {
  async execute ({ email, password }: IAuthenticateUserService): Promise<string> {
    const usersRepositories = getCustomRepository(UserRepository)

    const user = await usersRepositories.findOne({ email })

    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    // EuNãoSabiaOqueENemQuandoMasSabiaQueIriaSaberQuandoSoubesseQueSoube
    const token = sign(
      {
        email: user.email
      },
      '6e98bf127525d34fd99af9a8b46447e5',
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return token
  }
}

export { AuthenticateUserService }
