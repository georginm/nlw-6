import { getCustomRepository } from 'typeorm'
import { Compliment } from '../entities/Compliments'
import { ComplimentRepository } from '../repositories/ComplimentsRepository'

class ListUserSenderComplimentsService {
  async execute (user_id): Promise<Compliment[]> {
    const complimentsRepository = getCustomRepository(ComplimentRepository)

    const compliments = await complimentsRepository.find({
      where: {
        user_sender: user_id
      },
      relations: [
        'userSender',
        'userReceiver',
        'tag'
      ]
    })

    return compliments
  }
}
export { ListUserSenderComplimentsService }
