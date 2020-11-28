import {RouterContext} from '../dependencies/deps.ts'
import Survey from '../models/Survey.ts'
import response from '../helpers/http-response-helper.ts'
import User from '../models/User.ts'

export class BaseSurveyController {
  async findSurveyOrFail(id: string, ctx: RouterContext): Promise<Survey | null | undefined> {
    const survey = await Survey.findSurveyById(id)
    if (!survey) {
      response(ctx, 400, {
        message: 'Lo sentimos no hemos podido recuperar el recurso'
      })
      return null
    } else {
      const user = ctx.state.user as User
      const userId = user.id ? user.id : '1'
      if (survey.userId !== userId) {
        response(ctx, 401, {
          message: 'Lo sentimos no puedes consultar este recurso'
        })
        return undefined
      } else {
        return survey
      }
    }
  }
}