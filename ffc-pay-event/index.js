// const { saveEvent } = require('./event')
// const { sendMessage } = require('./signalr')
const { validateEvent } = require('./event-schema')

module.exports = async function (context, message) {
  const event = message
  context.log.info(`Received event: ${JSON.stringify(event)}`)
  try {
    if (validateEvent(event)) {
      context.log.info('Event validated successfully')
      // await saveEvent(context, event)
      // sendMessage(context, event)
      context.done()
    }
  } catch (error) {
    context.log.error('Unable to process message:', error)
  }
}
