import {compareSync, create, decode, hashSync, RouterContext, verify, Payload, Header} from '../dependencies/deps.ts'
import User from '../models/User.ts'

class AuthController {
  // @ts-ignore
  async login(ctx: RouterContext) {
    const {email, password} = await ctx.request.body().value

    const isValidLogin = loginFieldsValidation(email, password)
    if (!isValidLogin) {
      response(ctx, 422, {
        message: 'Los campos email y password son requeridos'
      })
      return
    }

    let user = await User.findOne(email)
    if (!user) {
      response(ctx, 422, {
        message: 'No hay un usuario con ese email'
      })
      return
    } else {

      const isValidPassword = compareSync(password, user.password)
      if (!isValidPassword) {
        response(ctx, 422, {
          message: 'La contraseña no es valida'
        })
        return
      } else {

        const oneHour = 60 * 60
        const expiration = Date.now() / 1000 + oneHour

        const payload: Payload = {
          iss: user.email,
          exp: expiration,
        }

        // @ts-ignore
        const secretKey : string = Deno.env.get('JWT_SECRET_KEY') || ''
        const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, secretKey)
        const payloadDecoded = await verify(jwt, secretKey, "HS512")

        response(ctx, 200, {
          id: user.id,
          name: user.name,
          email: user.email,
          token: jwt
        })
      }
    }
  }

  // @ts-ignore
  async register(ctx: RouterContext) {
    const {name, email, password} = await ctx.request.body().value

    const isValidRegistration = registerFieldsValidation(name, email, password)
    if (!isValidRegistration) {
      response(ctx, 422, {
        message: 'Los campos name, email y password son requeridos'
      })
      return
    }

    let userInDataBase = await User.findOne(email)
    if (userInDataBase) {
      response(ctx, 422, {
        message: 'Email ya esta en uso'
      })
      return
    } else {
      const hashPassword = hashSync(password)
      let userToSave = new User({name, email, password: hashPassword})

      const userSaved = await userToSave.save()

      if (userSaved) {
        response(ctx, 201, {
          id: userSaved.id,
          name: userSaved.name,
          email: userSaved.email
        })

      } else {
        response(ctx, 500, {
          message: 'Lo sentimos no hemos podido crear el usuario'
        })
        return
      }
    }
  }
}

const response = (ctx: RouterContext, status: number, body: object) => {
  ctx.response.status = status
  ctx.response.body = body
}

const registerFieldsValidation = (name: string, email: string, password: string): boolean => {
  return !(!name || !email || !password)
}

const loginFieldsValidation = (email: string, password: string): boolean => {
  return !(!email || !password)
}

const authController = new AuthController()

export default authController