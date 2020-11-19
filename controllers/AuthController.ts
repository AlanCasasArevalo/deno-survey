import {RouterContext} from '../dependencies/deps.ts'

class AuthController {
  async login(ctx: RouterContext) {
    const { name, email, password } = await ctx.request.body().value
  }
  async register(ctx: RouterContext) {
    const { name, email, password } = await ctx.request.body().value
  }
}

const authController = new AuthController()

export default authController