import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction): Promise<any> => {
  // Recebendo o token
  const token = request.headers.authorization

  if (!token) {
    return response.status(401).end()
  }

  try {
    // Verificar se o token é válido
    const { sub } = verify(
      token.replace('Bearer ', ''),
      '6e98bf127525d34fd99af9a8b46447e5') as IPayload

    // Recuperar informações do usuário
    request.user_id = sub

    return next()
  } catch (error) {
    return response.status(401).end()
  }

  // return response.status(200)
}
