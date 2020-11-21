import {RouterContext} from '../dependencies/deps.ts'
import Survey from '../models/Survey.ts'
import response from './helpers/http-response-helper.ts'

class SurveyController {
  async getAllSurvey(ctx: RouterContext) {
    const surveys = await Survey.findByUser('1')
    ctx.response.body = surveys ? surveys : []
  }

  // @ts-ignore
  async getSurveyById(ctx: RouterContext) {
    const id = await ctx.params.id
    const survey = await Survey.findSurveyById(id ? id : '')
    if (!survey) {
      response(ctx, 404, {
        message: 'Lo sentimos no hemos podido recuperar el recurso'
      })
      return
    } else {
      response(ctx, 200, survey)
    }
  }

  // @ts-ignore
  async postSurvey(ctx: RouterContext) {
    const {name, description} = await ctx.request.body().value
    const survey = new Survey('1', name, description)

    const surveySaved = await survey.create()
    if (surveySaved) {
      response(ctx, 201, {
        id: surveySaved.id,
        name: surveySaved.name,
        userId: surveySaved.userId,
        description: surveySaved.description
      })
    } else {
      response(ctx, 500, {
        message: 'Lo sentimos no hemos podido crear el recurso'
      })
      return
    }
  }

  // @ts-ignore
  async updateSurvey(ctx: RouterContext) {
  }

  async deleteSurvey(ctx: RouterContext) {
    ctx.response.body = {}
  }
}

const surveyController = new SurveyController()

export default surveyController