const checkCreateProjection = (context, raisedEvent) => {
  let createProjection = false
  createProjection = raisedEvent?.action?.type === 'submission' ||
    raisedEvent?.action?.type === 'return' ||
    raisedEvent?.action?.data?.error?.length > 0

  if (createProjection) {
    saveProjection(context, raisedEvent)
  }

  return createProjection
}

const saveProjection = (context, event) => {
  const frn = event?.action?.data?.paymentRequest?.frn ?? event?.action?.data?.frn
  const paymentRequestNumber = event?.action?.data?.paymentRequest?.paymentRequestNumber ?? event?.action?.data?.paymentRequestNumber
  const agreementNumber = event?.action?.data?.paymentRequest?.agreementNumber ?? event?.action?.data?.agreementNumber
  context.log.info(`Creating projection for ${event.id} with frn ${frn}, paymentRequestNumber ${paymentRequestNumber}, agreementNumber ${agreementNumber}`)
  context.bindings.outputSbTopic = { id: event.id, frn, paymentRequestNumber, agreementNumber }
}

module.exports = { checkCreateProjection }
