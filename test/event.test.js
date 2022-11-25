jest.mock('../ffc-pay-event/projection')
const mockProjection = require('../ffc-pay-event/projection')
jest.mock('../ffc-pay-event/storage')
const mockStorage = require('../ffc-pay-event/storage')
jest.mock('../ffc-pay-event/save-projection')
const mockSaveProjection = require('../ffc-pay-event/save-projection')
const mockContext = require('./mock-context')
const { saveEvent } = require('../ffc-pay-event/event')

describe('Event function', () => {
  const event = {
    properties: {
      id: '123456789',
      status: 'in progress',
      action: {
        timestamp: new Date(),
        type: 'event'
      }
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Save an event with no projection created', async () => {
    mockStorage.queryEntities.mockResolvedValue([])
    mockProjection.checkCreateProjection.mockReturnValue(false)

    await saveEvent(mockContext, event)
    expect(mockProjection.checkCreateProjection).toHaveBeenCalledTimes(1)
    expect(mockStorage.queryEntities).toHaveBeenCalledTimes(1)
    expect(mockContext.bindings).toHaveProperty('tableBinding')
    expect(mockContext.bindings.tableBinding[0].CreateProjection).toEqual(false)
  })

  test('Duplicated event found created', async () => {
    mockStorage.queryEntities.mockResolvedValue([{ test: 'test' }])
    mockProjection.checkCreateProjection.mockReturnValue(false)

    await saveEvent(mockContext, event)
    expect(mockProjection.checkCreateProjection).toHaveBeenCalledTimes(1)
    expect(mockStorage.queryEntities).toHaveBeenCalledTimes(1)
    expect(mockContext.bindings).toHaveProperty('tableBinding')
    expect(mockContext.bindings.tableBinding[0].Status).toEqual('duplicate event')
  })

  test('Save an event with a projection created', async () => {
    mockStorage.queryEntities.mockResolvedValue([])
    mockProjection.checkCreateProjection.mockReturnValue(true)
    await saveEvent(mockContext, event)
    expect(mockProjection.checkCreateProjection).toHaveBeenCalledTimes(1)
    expect(mockStorage.queryEntities).toHaveBeenCalledTimes(1)
    expect(mockContext.bindings).toHaveProperty('tableBinding')
    expect(mockContext.bindings.tableBinding[0].CreateProjection).toEqual(true)
  })

  test('Sends projection once if create projection required', async () => {
    mockStorage.queryEntities.mockResolvedValue([{ test: 'test' }])
    mockProjection.checkCreateProjection.mockReturnValue(true)
    await saveEvent(mockContext, event)
    expect(mockSaveProjection).toBeCalledTimes(1)
  })

  test('Does not send projection if create projection required', async () => {
    mockStorage.queryEntities.mockResolvedValue([{ test: 'test' }])
    mockProjection.checkCreateProjection.mockReturnValue(false)
    await saveEvent(mockContext, event)
    expect(mockSaveProjection).not.toHaveBeenCalled()
  })
})
