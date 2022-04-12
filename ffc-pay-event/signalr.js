const sendMessageToSignalR = (context, message) => {
  if (JSON.parse(process.env.USE_SIGNALR)) {
    context.log.info('signalR event sent')
    context.bindings.signalRMessages = [{
      target: 'payEvent',
      arguments: [message]
    }]
  }
}

module.exports = { sendMessageToSignalR }
