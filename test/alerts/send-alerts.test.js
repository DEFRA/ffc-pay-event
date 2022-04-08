const { sendMessageToAlerts } = require('../../ffc-pay-event/alerts')
const mockContext = require('../mock-context')

let mockEvent

describe('Send alerts function', () => {
  beforeEach(() => {
    jest.resetModules()
    mockEvent = {
      name: 'Create Invoice',
      properties: {
        id: '1234567890',
        checkpoint: 'acr-test-log-web',
        status: 'in progress',
        action:
          {
            type: 'create',
            message: 'Invoice created',
            timestamp: '17/02/2022'
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
