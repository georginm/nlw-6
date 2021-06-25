import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

export const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction): Promise<any> => {
  const { user_id } = request

  const userRepository = getCustomRepository(UserRepository)

  const { admin } = await userRepository.findOne(user_id)

  if (admin) {
    return next()
  }

  return response.status(401).json({
    error: 'Unauthorized'
  })
}
