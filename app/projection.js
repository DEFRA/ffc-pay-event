const checkCreateProjection = (context, raisedEvent) => {
  let createProjection = false
  createProjection = raisedEvent?.action?.type === 'submission' || raisedEvent?.action?.data?.error?.length > 0
  if (createProjection) {
    saveProjection(context, raisedEvent)
  }

  return createProjection
}

const saveProjection = (context, event) => {
  context.log.info(`Creating projection for ${event.id}`)
  context.bindings.outputSbTopic = { id: event.id }
}

module.exports = { checkCreateProjection }
