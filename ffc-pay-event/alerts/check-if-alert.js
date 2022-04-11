const { ALERT_TYPES } = require('./config')

module.exports = function (messageType) {
  return ALERT_TYPES.includes(messageType)
}
