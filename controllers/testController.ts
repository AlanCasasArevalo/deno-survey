import {RouterContext} from '../dependencies/deps.ts'

const testController = (ctx: RouterContext) => {
  ctx.response.status = 200
  ctx.response.body = {
    success: true,
    message: 'todo perfecs'
  }
}

const controller = {
  testController
}

export default controller