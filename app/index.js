const saveEvent = require('./event')
const sendMessage = require('./signalr')

module.exports = async function (context, message) {
  const event = message
  try {
    if (event?.properties?.id !== undefined) {
      await saveEvent(context, event)
      sendMessage(context, event)
      context.done()
    }
  } catch (error) {
    context.log.error('Unable to process message:', error)
    throw error
  }
}
