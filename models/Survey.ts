import {surveyCollection} from '../db/mongo.ts'
import BaseModel from './BaseModel.ts'

export default class Survey extends BaseModel {
  public id?: string = ''

  constructor(public userId: string, public name: string, public description: string) {
    super()
    this.name = name
    this.description = description
  }

  static async findByUser(userId: string): Promise<Survey[]> {
    const surveys: Survey[] = (await surveyCollection.find(userId) as Survey[])
    surveys.map((survey: any) => {
      this.prepare(survey)
    })
    return surveys
  }

  static async findSurveyById(id: string): Promise<Survey | null> {
    const survey = await surveyCollection.findOne({_id: {$oid: id}})
    return survey ? this.prepare(survey) : null
  }

  async create() {
    delete this.id
    const {$oid} = await surveyCollection.insertOne(this)
    this.id = $oid
    return this
  }

  protected static prepare(data: any): Survey {
    data = BaseModel.prepare(data)
    const survey = new Survey(data.id, data.name, data.description)
    survey.id = data.id
    return survey
  }
}
