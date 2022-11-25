const saveProjection = (context, event) => {
  const frn = event?.action?.data?.paymentRequest?.frn ?? event?.action?.data?.frn
  const paymentRequestNumber = event?.action?.data?.paymentRequest?.paymentRequestNumber ?? event?.action?.data?.paymentRequestNumber
  const agreementNumber = event?.action?.data?.paymentRequest?.agreementNumber ?? event?.action?.data?.agreementNumber
  if (frn && paymentRequestNumber && agreementNumber) {
    context.log.info(`Creating projection for ${event.id} with frn ${frn}, paymentRequestNumber ${paymentRequestNumber}, agreementNumber ${agreementNumber}`)
    context.bindings.outputSbTopic = { id: event.id, frn, paymentRequestNumber, agreementNumber }
  } else {
    context.log.info(`Skipping projection for ${event.id} as mandatory projection data not present`)
  }
}

module.exports = saveProjection
