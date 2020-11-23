import {RouterContext} from '../dependencies/deps.ts'

const response = (ctx: RouterContext, status: number, body: object) => {
  ctx.response.status = status
  ctx.response.body = body
}

export default response