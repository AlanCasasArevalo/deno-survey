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

app.use(router.routes())
app.use(router.allowedMethods())

export default app

