const sendMessage = (context, message) => {
  if (process.env.USE_SIGNALR) {
    context.log.info('signalR event sent')
    context.bindings.signalRMessages = [{
      target: 'payEvent',
      arguments: [message]
    }]
  }
}

module.exports = { sendMessage }
