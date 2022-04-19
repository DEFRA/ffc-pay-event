const sendMessageToAlerts = require('../../ffc-pay-event/alerts/send-message-to-alerts')
const mockContext = require('../mock-context')

let mockEvent

describe('Send message to alerts', () => {
  beforeEach(() => {
    jest.resetModules()
    mockEvent = {
      name: 'test',
      properties: {
        id: '123456789',
        checkpoint: 'test',
        status: 'testing',
        action: {
          type: 'error',
          message: 'test',
          timestamp: new Date(),
          data: {}
        }
      }
    }
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('should call outputPayAlertTopic binding when sendMessageToAlerts is called', async () => {
    await sendMessageToAlerts(mockContext, mockEvent)
    expect(mockContext.bindings).toHaveProperty('outputPayAlertTopic')
  })

  test('should push event to outputPayAlertTopic binding when sendMessageToAlerts is called', async () => {
    await sendMessageToAlerts(mockContext, mockEvent)
    expect(mockContext.bindings.outputPayAlertTopic[0]).toBe(mockEvent)
  })
})
