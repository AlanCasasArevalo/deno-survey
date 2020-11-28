import {RouterContext} from '../dependencies/deps.ts'
import Survey from '../models/Survey.ts'
import response from '../helpers/http-response-helper.ts'
import {BaseSurveyController} from './BaseSurveyController.ts'
import User from '../models/User.ts'

class SurveyController extends BaseSurveyController {
  async getAllSurvey(ctx: RouterContext) {
    const user = ctx.state.user as User
    const userId = user.id ? user.id : '1'
    const surveys = await Survey.findByUser(userId)
    ctx.response.body = surveys ? surveys : []
  }

  // @ts-ignore
  async getSurveyById(ctx: RouterContext) {
    const id = await ctx.params.id
    const survey = await this.findSurveyOrFail(id ? id : '', ctx)
    if (survey === undefined) {
      response(ctx, 401, {
        message: 'Lo sentimos no puedes consultar este recurso'
      })
      return undefined
    } else if (!survey) {
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

    const user = ctx.state.user as User
    const userId = user.id ? user.id : '1'
    const survey = new Survey(userId, name, description)

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
    const id = await ctx.params.id
    const survey = await this.findSurveyOrFail(id ? id : '', ctx)

    if (survey) {
      const {name, description} = await ctx.request.body().value
      const surveyUpdate = await survey.update({name, description})
      if (!surveyUpdate) {
        response(ctx, 500, {
          message: 'Lo sentimos no hemos podido actualizar el recurso'
        })
        return
      } else {
        response(ctx, 201, {
          id: surveyUpdate.id,
          name: surveyUpdate.name,
          userId: surveyUpdate.userId,
          description: surveyUpdate.description
        })
      }
    }
  }

  // @ts-ignore
  async deleteSurvey(ctx: RouterContext) {
    const id = await ctx.params.id
    const survey = await this.findSurveyOrFail(id ? id : '', ctx)

    if (survey) {
      const surveyToDelete = await survey.delete(id ? id : '')
      if (!surveyToDelete) {
        response(ctx, 500, {
          message: 'Lo sentimos no hemos podido actualizar el recurso'
        })
        return
      } else {
        response(ctx, 204, {})
      }
    }
  }
}

const surveyController = new SurveyController()

export default surveyController