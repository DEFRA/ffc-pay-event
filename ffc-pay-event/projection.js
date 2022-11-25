const checkCreateProjection = (context, raisedEvent) => {
  let createProjection = false
  createProjection = raisedEvent?.action?.type === 'submission' ||
    raisedEvent?.action?.type === 'return' ||
    raisedEvent?.action?.data?.error?.length > 0

  return createProjection
}

module.exports = { checkCreateProjection }
