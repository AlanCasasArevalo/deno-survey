import {hashSync, RouterContext} from '../dependencies/deps.ts'
import User from '../models/User.ts'

class AuthController {
  async login(ctx: RouterContext) {
    const { name, email, password } = await ctx.request.body().value
  }
  // @ts-ignore
  async register(ctx: RouterContext) {
    const { name, email, password } = await ctx.request.body().value

    let userInDataBase = await User.findOne(email)
    if (userInDataBase) {
      ctx.response.status = 422
      ctx.response.body = {
        message: 'Email is already used'
      }
      return
    } else {
      const hashPassword = hashSync(password)
      let userToSave = new User({name, email, password: hashPassword})

      const userSaved = await userToSave.save()
      if (userSaved) {
        ctx.response.status = 201
        ctx.response.body = {
          id: userSaved.id,
          name: userSaved.name,
          email: userSaved.email
        }
      } else {
        ctx.response.status = 500
        ctx.response.body = {
          message: 'Lo sentimos no hemos podido crear el usuario'
        }
      }
    }
  }
}

const authController = new AuthController()

export default authController