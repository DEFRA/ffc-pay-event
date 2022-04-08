jest.mock('../ffc-pay-event/event')
const mockEvent = require('../ffc-pay-event/event')

jest.mock('../ffc-pay-event/signalr')
const mockSignalR = require('../ffc-pay-event/signalr')

jest.mock('../ffc-pay-event/alerts')
const mockAlert = require('../ffc-pay-event/alerts')

const processEvent = require('../ffc-pay-event/index')
const mockContext = require('./mock-context')

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
    jest.resetAllMocks()
  })

  test('receives message from service bus and successfully calls save and send message', async () => {
    await processEvent(mockContext, message)
    expect(mockEvent.saveEvent).toHaveBeenCalledTimes(1)
    expect(mockSignalR.sendMessageToSignalR).toHaveBeenCalledTimes(1)
  })

  test('receives message from service bus with invalid id and does not calls save and send message', async () => {
    message.properties.id = 123456789
    await processEvent(mockContext, message)
    expect(mockEvent.saveEvent).toHaveBeenCalledTimes(0)
    expect(mockSignalR.sendMessageToSignalR).toHaveBeenCalledTimes(0)
  })

  test('should call sendMessageToAlerts when a valid message is received', async () => {
    await processEvent(mockContext, message)
    expect(mockAlert.sendMessageToAlerts).toHaveBeenCalled()
  })
})
