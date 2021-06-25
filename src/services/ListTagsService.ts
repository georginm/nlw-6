import { getCustomRepository } from 'typeorm'
import { Tag } from '../entities/Tag'
import { TagRepository } from '../repositories/TagRepository'

class ListTagService {
  async execute (): Promise<Tag[]> {
    const tagRepository = getCustomRepository(TagRepository)

    const tags = await tagRepository.find()

    return tags
  }
}

export { ListTagService }
