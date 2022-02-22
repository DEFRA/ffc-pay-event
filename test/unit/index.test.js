jest.mock('../../app/event')
const mockSaveEvent = require('../../app/event')
jest.mock('../../app/signalr')
const mockSendMessage = require('../../app/signalr')
const processEvent = require('../../app/index')
const mockContext = require('../mock-context')

describe('index function', () => {
  const message = {
    name: 'test',
    properties: {
      id: '123456789',
      checkpoint: 'test',
      status: 'testing',
      action: {
        type: 'test',
        message: 'test',
        timestamp: new Date(),
        data: {}
      }
    }
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  test('receives message from service bus and successfully calls save and send message', async () => {
    await processEvent(mockContext, message)
    expect(mockSaveEvent).toHaveBeenCalledTimes(1)
    expect(mockSendMessage).toHaveBeenCalledTimes(1)
    expect(mockContext.done.mock.calls.length).toEqual(1)
  })

  test('receives message from service bus with invalid id and does not calls save and send message', async () => {
    message.properties.id = 123456789
    await processEvent(mockContext, message)
    expect(mockSaveEvent).toHaveBeenCalledTimes(0)
    expect(mockSendMessage).toHaveBeenCalledTimes(0)
    expect(mockContext.done.mock.calls.length).toEqual(0)
  })

  test('an error is thrown (and logged) when an error occurs', async () => {
    // mockSaveEvent.mockImplementation(() => { throw new Error() })
    await processEvent(mockContext, message)
    expect(mockContext.log.error).toHaveBeenCalledTimes(0)
  })
})
