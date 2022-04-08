module.exports = function (context, event) {
  context.log.info(`Sending ${JSON.stringify(event)} to ffc-pay-alerts`)
  context.bindings.outputPayAlertTopic = []
  context.bindings.outputPayAlertTopic.push(event)
}
