const checkIfAlert = require('./check-if-alert')
const sendMessageToAlerts = require('./send-message-to-alerts')

const sendAlert = (context, message) => {
  if (checkIfAlert(message.properties.action.type)) {
    sendMessageToAlerts(context, message)
  }
}

module.exports = {
  sendAlert
}
