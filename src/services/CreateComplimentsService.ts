import { getCustomRepository } from 'typeorm'
import { Compliment } from '../entities/Compliments'
import { ComplimentRepository } from '../repositories/ComplimentsRepository'
import { UserRepository } from '../repositories/UserRepository'

interface IComplimentRequest{
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

class CreateComplimentService {
  async execute ({ tag_id, user_receiver, user_sender, message }: IComplimentRequest): Promise<Compliment> {
    const complimentsRepositories = getCustomRepository(ComplimentRepository)

    const usersRepositories = getCustomRepository(UserRepository)

    const userReceiverExists = await usersRepositories.findOne(user_receiver)

    if (user_sender === user_receiver) {
      throw new Error('User does not send compliments to himself')
    }

    if (!userReceiverExists) {
      throw new Error('User Receiver does not Exists!')
    }

    const compliment = await complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    await complimentsRepositories.save(compliment)

    return compliment
  }
}

export { CreateComplimentService }
