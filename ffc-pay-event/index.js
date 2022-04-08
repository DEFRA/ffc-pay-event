const { saveEvent } = require('./event')
const { sendMessageToAlerts } = require('./alerts')
const { sendMessageToSignalR } = require('./signalr')
const { validateEvent } = require('./event-schema')

module.exports = async function (context, message) {
  const event = message
  context.log.info(`Received event: ${JSON.stringify(event)}`)

  sendMessageToAlerts(context, event)

  if (validateEvent(event)) {
    context.log.info('Event validated successfully')
    await saveEvent(context, event)
    sendMessageToSignalR(context, event)
  }
}
