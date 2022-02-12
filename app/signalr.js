const useSignalr = process.env.USE_SIGNALR

const sendMessage = (context, message) => {
  if (useSignalr) {
    context.bindings.signalRMessages = [{
      target: 'payEvent',
      arguments: [message]
    }]
  }
}

module.exports = sendMessage
