import {Router} from '../dependencies/deps.ts'

import authController from '../controllers/AuthController.ts'
import surveyController from '../controllers/SurveyController.ts'
import {authMiddleware} from '../middlewares/authMiddleware.ts'
import questionController from '../controllers/QuestionController.ts'

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

/************************************  Questions  *************************************/
router.get('/api/survey/:surveyId/questions',
  authMiddleware,
  questionController.getAllQuestions.bind(questionController)
)
router.post('/api/questions/:surveyId',
  authMiddleware,
  questionController.postQuestion.bind(questionController)
)
router.get('/api/questions/:id',
  authMiddleware,
  questionController.getQuestionById.bind(questionController)
)
router.put('/api/questions/:id',
  authMiddleware,
  questionController.updateQuestion.bind(questionController)
)
router.delete('/api/questions/:id',
  authMiddleware,
  questionController.deleteQuestion.bind(questionController)
)

export default router