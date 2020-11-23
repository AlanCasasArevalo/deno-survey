import {Router} from '../dependencies/deps.ts'

import authController from '../controllers/AuthController.ts'
import surveyController from '../controllers/SurveyController.ts'

const router = new Router()

router.post('/api/login', authController.login)
router.post('/api/register', authController.register)

router.get('/api/survey', surveyController.getAllSurvey.bind(surveyController))
router.post('/api/survey', surveyController.postSurvey.bind(surveyController))
router.get('/api/survey/:id', surveyController.getSurveyById.bind(surveyController))
router.put('/api/survey/:id', surveyController.updateSurvey.bind(surveyController))
router.delete('/api/survey/:id', surveyController.deleteSurvey.bind(surveyController))

export default router