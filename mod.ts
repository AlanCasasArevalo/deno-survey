import {log} from './dependencies/deps.ts'
import app from './app.ts'

const PORT = 8000

app.addEventListener('error', (event) => {
  log.error(event.error)
})

app.addEventListener('listen', ({hostname, port, secure}) => {
  log.info(`Listening on ${secure ? 'https://' : 'http://'}${hostname || 'localhost'}:${port || PORT}`)
})

await app.listen({
  port: PORT
})
