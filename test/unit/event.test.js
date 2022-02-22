jest.mock('../../app/projection')
const mockCheckCreateProjection = require('../../app/projection')
jest.mock('../../app/storage')
const mockQueryEntities = require('../../app/storage')
const saveEvent = require('../../app/event')
const mockContext = require('../mock-context')

describe('Event function', () => {
  const message = {
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
    jest.resetModules()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  test('Save an event with no projection created', async () => {
    mockQueryEntities.mockResolvedValue([])
    mockCheckCreateProjection.mockResolvedValue(false)

    await saveEvent(mockContext, message)
    expect(mockCheckCreateProjection).toHaveBeenCalledTimes(1)
    expect(mockQueryEntities).toHaveBeenCalledTimes(1)
    expect(mockContext.bindings).toHaveProperty('tableBinding')
    expect(mockContext.bindings.tableBinding[0].CreateProjection).toEqual(false)
  })

  test('Duplicated event found created', async () => {
    mockQueryEntities.mockResolvedValue([{ test: 'test' }])
    mockCheckCreateProjection.mockResolvedValue(false)

    await saveEvent(mockContext, message)
    expect(mockCheckCreateProjection).toHaveBeenCalledTimes(1)
    expect(mockQueryEntities).toHaveBeenCalledTimes(1)
    expect(mockContext.bindings).toHaveProperty('tableBinding')
    expect(mockContext.bindings.tableBinding[0].Status).toEqual('duplicate event')
  })

  test('Save an event with a projection created', async () => {
    mockQueryEntities.mockResolvedValue([])
    mockCheckCreateProjection.mockResolvedValue(true)
    await saveEvent(mockContext, message)
    expect(mockCheckCreateProjection).toHaveBeenCalledTimes(1)
    expect(mockQueryEntities).toHaveBeenCalledTimes(1)
    expect(mockContext.bindings).toHaveProperty('tableBinding')
    expect(mockContext.bindings.tableBinding[0].CreateProjection).toEqual(true)
  })
})
