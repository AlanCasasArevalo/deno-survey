import {RouterContext, verify} from '../dependencies/deps.ts'
import response from '../helpers/http-response-helper.ts'
import User from '../models/User.ts'

// @ts-ignore
export const authMiddleware = async (ctx: RouterContext, next: Function) => {
  const headers = ctx.request.headers
  const authHeader = headers.get('Authorization')
  if (!authHeader) {
    response(ctx, 401, {
      message: 'No autorizado a realizar esta operacion'
    })
    return
  }

  const jwt = authHeader.split(' ')[1]

  if (!jwt || jwt === 'undefined') {
    response(ctx, 401, {
      message: 'No autorizado a realizar esta operacion'
    })
    return
  }

  // @ts-ignore
  const secretKey: string = Deno.env.get('JWT_SECRET_KEY') || ''
  const payloadDecoded = await verify(jwt, secretKey, "HS512")
  if (payloadDecoded) {
    console.log(``, payloadDecoded)
    const user = await User.findOne({email: payloadDecoded.iss})
    ctx.state.user = user
    await next()
  } else {
    response(ctx, 401, {
      message: 'No autorizado a realizar esta operacion'
    })
    return
  }
}