import {RouterContext} from '../dependencies/deps.ts'
import Survey from '../models/Survey.ts'
import response from '../helpers/http-response-helper.ts'

export class BaseSurveyController {
  async findSurveyOrFail (id: string, ctx: RouterContext): Promise< Survey | null> {
    const survey = await Survey.findSurveyById(id)
    if (!survey) {
      response(ctx, 400, {
        message: 'Lo sentimos no hemos podido recuperar el recurso'
      })
      return null
    } else {
      return survey
    }
  }
}