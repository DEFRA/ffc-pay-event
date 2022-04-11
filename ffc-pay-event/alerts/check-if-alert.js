const { ALERT_TYPES } = require('./config')

module.exports = function (context, messageType) {
  context.log.info('Type: ', messageType, ALERT_TYPES.includes(messageType))
  return ALERT_TYPES.includes(messageType)
}
