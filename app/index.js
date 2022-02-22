const saveEvent = require('./event')
const sendMessage = require('./signalr')
const validateEvent = require('./event-schema')

module.exports = async function (context, message) {
  const event = message
  try {
    if (validateEvent(event)) {
      await saveEvent(context, event)
      sendMessage(context, event)
      context.done()
    }
  } catch (error) {
    context.log.error('Unable to process message:', error)
    throw error
  }
}
