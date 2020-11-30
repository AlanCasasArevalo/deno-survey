import {RouterContext} from '../dependencies/deps.ts'
import response from '../helpers/http-response-helper.ts'
import {BaseSurveyController} from './BaseSurveyController.ts'
import Question from '../models/Questions.ts'

class QuestionController extends BaseSurveyController {
  // @ts-ignore
  async getAllQuestions(ctx: RouterContext) {
    const surveyId = ctx.params.surveyId ? ctx.params.surveyId : ''
    const survey = await this.findSurveyOrFail(surveyId ? surveyId : '', ctx)

    if (survey) {
      const questions = await Question.findBySurvey(surveyId)
      response(ctx, 200, {
        questions: questions ? questions : []
      })
    } else {
      response(ctx, 404, {
        message: 'Lo sentimos no hemos podido recuperar el recurso'
      })
      return
    }
  }

  // @ts-ignore
  async getQuestionById(ctx: RouterContext) {
    const questionId = ctx.params.id ? ctx.params.id : ''
    const question = await Question.findQuestionById(questionId)

    if (question) {
      console.log(``)
      response(ctx, 200, question)
    } else {
      response(ctx, 404, {
        message: 'Lo sentimos no hemos podido recuperar el recurso'
      })
      return
    }
  }

  // @ts-ignore
  async postQuestion(ctx: RouterContext) {
    const surveyId = ctx.params.surveyId ? ctx.params.surveyId : ''
    const {text, type, required, data} = await ctx.request.body().value
    const survey = await this.findSurveyOrFail(surveyId ? surveyId : '', ctx)

    if (survey) {
      const question = new Question(surveyId, text, type, required, data)
      await question.create()

      response(ctx, 201, {
        question: question ? question : undefined
      })
    } else {
      response(ctx, 404, {
        message: 'Lo sentimos no hemos podido crear el recurso'
      })
      return
    }
  }

  // @ts-ignore
  async updateQuestion(ctx: RouterContext) {
    response(ctx, 201, {
      message: 'Hola desde updateSurvey'
    })
  }

  // @ts-ignore
  async deleteQuestion(ctx: RouterContext) {
    response(ctx, 201, {
      message: 'Hola desde deleteSurvey'
    })
  }
}

const questionController = new QuestionController()

export default questionController
