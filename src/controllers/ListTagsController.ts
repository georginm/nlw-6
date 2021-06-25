import { Request, Response } from 'express'
import { ListTagService } from '../services/ListTagsService'

class ListTagController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listTagService = new ListTagService()
    const tags = await listTagService.execute()

    return response.json({ tags })
  }
}

export { ListTagController }
