const checkIfAlert = require('./check-if-alert')
const sendMessageToAlerts = require('./send-message-to-alerts')

module.exports = function (context, message) {
  if (checkIfAlert(context, message.properties.action.type)) {
    sendMessageToAlerts(context, message)
  }
}
