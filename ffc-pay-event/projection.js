const checkCreateProjection = (context, raisedEvent) => {
  let createProjection = false
  createProjection = raisedEvent?.action?.type === 'submission' || raisedEvent?.action?.data?.error?.length > 0
  if (createProjection) {
    saveProjection(context, raisedEvent)
  }

  return createProjection
}

const saveProjection = (context, event) => {
  const frn = event?.action?.data?.paymentRequest?.frn ?? event?.action?.data?.frn
  context.log.info(`Creating projection for ${event.id} with frn ${frn}`)
  context.bindings.outputSbTopic = { id: event.id, frn }
}

module.exports = { checkCreateProjection }
