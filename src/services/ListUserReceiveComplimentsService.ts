import { getCustomRepository } from 'typeorm'
// import { Compliment } from '../entities/Compliments'
import { ComplimentRepository } from '../repositories/ComplimentsRepository'

class ListUserReceiveComplimentsService {
  async execute (user_id): Promise<any> {
    const complimentsRepository = getCustomRepository(ComplimentRepository)

    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id
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
export { ListUserReceiveComplimentsService }
