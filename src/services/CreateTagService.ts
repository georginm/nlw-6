import { getCustomRepository } from 'typeorm'
import { Tag } from '../entities/Tag'
import { TagRepository } from '../repositories/TagRepository'

class CreateTagService {
  async execute (name: string): Promise<Tag> {
    const tagRepository = getCustomRepository(TagRepository)

    if (!name) {
      throw new Error('Invalid name')
    }

    const tagAlreadyExists = await tagRepository.findOne({ name })
    if (tagAlreadyExists) {
      throw new Error('Tag Already Exists')
    }

    const tag = tagRepository.create({
      name
    })

    await tagRepository.save(tag)

    return tag
  }
}

export { CreateTagService }
