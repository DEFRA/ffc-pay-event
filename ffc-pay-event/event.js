const { checkCreateProjection } = require('./projection')
const saveProjection = require('./save-projection')
const { queryEntities } = require('./storage')

const saveEvent = async (context, event) => {
  const eventType = event.name
  const raisedEvent = event.properties
  const eventRaised = new Date(raisedEvent.action.timestamp)
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
    EventType: eventType,
    EventRaised: eventRaised,
    CreateProjection: createProjection,
    Payload: JSON.stringify(raisedEvent.action),
    Status: event.properties.status
  }

  context.bindings.tableBinding = []
  context.bindings.tableBinding.push(eventLog)

  if (createProjection) {
    saveProjection(context, raisedEvent)
  }

  context.log.info(`Event saved successfully: partitionKey: ${partitionKey}, rowKey: ${rowKey}`)
}

module.exports = { saveEvent }
