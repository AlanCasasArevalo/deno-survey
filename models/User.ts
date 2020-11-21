import {usersCollection} from '../db/mongo.ts'

export interface UserInterface {
  id?: string
  name: string
  email: string
  password: string
}

export default class User implements UserInterface {
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

  static async findOne(params: any) {
    const user = await usersCollection.findOne(params)
    // @ts-ignore
    user.id = user._id.$oid
    // @ts-ignore
    delete user._id
    // @ts-ignore
    return new User(user)
  }

  async save() {
    delete this.id;
    const { $oid } = await usersCollection.insertOne(this);
    this.id = $oid;
    return this;
  }
}
