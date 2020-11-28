import {Router} from '../dependencies/deps.ts'

import authController from '../controllers/AuthController.ts'
import surveyController from '../controllers/SurveyController.ts'
import {authMiddleware} from '../middlewares/authMiddleware.ts'

const router = new Router()

router.post('/api/login', authController.login)
router.post('/api/register', authController.register)

/************************************  Survey  ************************************/
router.get('/api/survey',
  authMiddleware,
  surveyController.getAllSurvey.bind(surveyController)
)
router.post('/api/survey',
  authMiddleware,
  surveyController.postSurvey.bind(surveyController)
)
router.get('/api/survey/:id',
  authMiddleware,
  surveyController.getSurveyById.bind(surveyController)
)
router.put('/api/survey/:id',
  authMiddleware,
  surveyController.updateSurvey.bind(surveyController)
)
router.delete('/api/survey/:id',
  authMiddleware,
  surveyController.deleteSurvey.bind(surveyController)
)

export default router