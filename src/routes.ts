import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ListTagController } from './controllers/ListTagsController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ListUsersController } from './controllers/ListUsersController'
import { ListUserSenderComplimentsController } from './controllers/ListUserSenderComplimentsController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const compliementController = new CreateComplimentController()
const listUserReceiveController = new ListUserReceiveComplimentsController()
const listUserSenderController = new ListUserSenderComplimentsController()
const listTagsController = new ListTagController()
const listUserController = new ListUsersController()

router.post('/users', createUserController.handle)
router.get('/users/send', ensureAuthenticated, listUserSenderController.handle)
router.get('/users/receive', ensureAuthenticated, listUserReceiveController.handle)
router.get('/users', ensureAuthenticated, ensureAdmin, listUserController.handle)

router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
)
router.get('/tags', ensureAuthenticated, listTagsController.handle)

router.post('/login', authenticateUserController.handle)

router.post(
  '/compliments',
  ensureAuthenticated,
  compliementController.handle
)

export { router }
