module.exports = async function (context, message) {
  try {
    const event = message
    if (event.id !== undefined) {
      context.bindings.outputSbTopic = event
      context.log.info(`Published event for ${event.id}`)
      context.done()
    }
  } catch (error) {
    context.log.error('Unable to process message:', error)
    throw error
  }
}
