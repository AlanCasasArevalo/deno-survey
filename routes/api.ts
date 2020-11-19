import {Router, RouterContext} from '../dependencies/deps.ts'

import testController from '../controllers/testController.ts'

const router = new Router()

router.get('/', testController.testController)

export default router