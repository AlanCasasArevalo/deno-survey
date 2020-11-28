import {RouterContext, verify} from '../dependencies/deps.ts'
import response from '../helpers/http-response-helper.ts'

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

  if (!jwt) {
    response(ctx, 401, {
      message: 'No autorizado a realizar esta operacion'
    })
    return
  }

  const secretKey: string = Deno.env.get('JWT_SECRET_KEY') || ''
  const payloadDecoded = await verify(jwt, secretKey, "HS512")
  if (payloadDecoded) {
    console.log(``, payloadDecoded)
    await next()
  } else {
    response(ctx, 401, {
      message: 'No autorizado a realizar esta operacion'
    })
    return
  }
}