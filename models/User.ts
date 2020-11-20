import {usersCollection} from '../db/mongo.ts'

export default class User {
  public id?: string
  public name: string
  public email: string
  public password: string

  constructor({id = '', name = '', email = '', password = ''}) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  static findOne(params: any) {
    return usersCollection.findOne(params)
  }

  async save() {
    delete this.id;
    const { $oid } = await usersCollection.insertOne(this);
    this.id = $oid;
    return this;
  }
}
