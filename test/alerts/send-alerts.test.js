const { sendMessageToAlerts } = require('../../ffc-pay-event/alerts')
const mockContext = require('../mock-context')

describe('Send alerts function', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('Send message to outputPayAlertTopic binding called', async () => {
    const event = {
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

    await sendMessageToAlerts(mockContext, event)
    expect(mockContext.bindings).toHaveProperty('outputPayAlertTopic')
  })
})
