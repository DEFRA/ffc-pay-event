const checkCreateProjection = require('./projection')
const queryEntities = require('./storage')

const saveEvent = async (context, event) => {
  const raisedEvent = event.properties
  const timespan = new Date(raisedEvent.action.timestamp).getTime()
  const createProjection = await checkCreateProjection(context, raisedEvent)

  const partitionKey = raisedEvent.id.toString()
  let rowKey = `${raisedEvent.id}_${timespan}`

  const checkIfEntityExists = await queryEntities(partitionKey, rowKey)

  if (checkIfEntityExists.length > 0) {
    rowKey = `${raisedEvent.id}_${new Date().getTime()}`
    event.properties.status = 'duplicate event'
  }

  const eventLog = {
    PartitionKey: partitionKey,
    RowKey: rowKey,
    EventType: raisedEvent.action.type,
    CreateProjection: createProjection,
    Payload: JSON.stringify(raisedEvent.action),
    Status: event.properties.status
  }

  context.bindings.tableBinding = []
  context.bindings.tableBinding.push(eventLog)
}

module.exports = saveEvent
