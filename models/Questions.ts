import {questionCollection} from '../db/mongo.ts'
import BaseModel from './BaseModel.ts'

export default class Question extends BaseModel {
  public id: string = ""

  constructor(
    public surveyId: string,
    public text: string,
    public type: QuestionType,
    public required: boolean,
    public data: Object
  ) {
    super()
  }

  static async findBySurvey(surveyId: string): Promise<Question[]> {
    const questions: Question[] = (await questionCollection.find(surveyId) as Question[])
    questions.map((question: any) => {
      this.prepare(question)
    })
    return questions
  }

  static async findQuestionById(id: string): Promise<Question | null> {
    const question = await questionCollection.findOne({_id: {$oid: id}})
    return question ? this.prepare(question) : null
  }

  async create() {
    const {$oid} = await questionCollection.insertOne(this)
    this.id = $oid
    return this
  }

  async update(text: string, type: QuestionType, required: boolean, data: Object) {
    // const result = await questionCollection.updateOne({_id: {$oid: this.id}}, {text, type, required, data})
    // if (result) {
    //   this.text = text
    //   this.type = type
    //   this.required = required
    //   this.data = data
    //   return this
    // } else {
    //   return null
    // }
  }

  async delete(id: string) {
    // const result = await questionCollection.deleteOne({_id: {$oid: id}})
    // if (result) {
    //   return 1
    // } else {
    //   return null
    // }
  }

  protected static prepare(data: any): Question {
    data = BaseModel.prepare(data)
    const question = new Question(
      data.surveyId,
      data.text,
      data.type,
      data.required,
      data.data
    )
    question.id = data.id
    return question
  }

}

export enum QuestionType {
  CHOICE = 'choice',
  TEXT = 'text',
}