import { Request, Response } from 'express'
import { ListUsersService } from '../services/ListUsersService'

class ListUsersController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUsersService()
    const user = await listUserService.execute()

    return response.json(user)
  }
}

export { ListUsersController }
