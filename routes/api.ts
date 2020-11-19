import {Router} from '../dependencies/deps.ts'

import authController from '../controllers/AuthController.ts'

const router = new Router()

router.post('/api/login', authController.login)
router.post('/api/register', authController.register)

export default router