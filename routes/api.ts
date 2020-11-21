import {Router} from '../dependencies/deps.ts'

import authController from '../controllers/AuthController.ts'
import surveyController from '../controllers/SurveyController.ts'

const router = new Router()

router.post('/api/login', authController.login)
router.post('/api/register', authController.register)
router.get('/api/survey', surveyController.getAllSurvey)
router.post('/api/survey', surveyController.postSurvey)
router.get('/api/survey/:id', surveyController.getSurveyById)
router.put('/api/survey/:id', surveyController.updateSurvey)
router.delete('/api/survey/:id', surveyController.deleteSurvey)

export default router