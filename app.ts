import {Application, log, RouterContext, send} from './dependencies/deps.ts'

import router from './routes/api.ts'

const app = new Application()

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('INFO')
  },
  loggers: {
    default: {
      level: 'INFO',
      handlers: ['console']
    }
  }
})

// @ts-ignore
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.response.body = 'Error en el servidor'
    throw error
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

export default app

