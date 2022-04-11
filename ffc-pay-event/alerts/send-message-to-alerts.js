module.exports = function (context, message) {
  context.log.info(`Sending ${JSON.stringify(message)} to ffc-pay-alerts`)
  context.bindings.outputPayAlertTopic = []
  context.bindings.outputPayAlertTopic.push(message)
}
