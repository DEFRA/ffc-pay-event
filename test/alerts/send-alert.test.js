const { sendAlert } = require('../../ffc-pay-event/alerts/send-alert')
const mockContext = require('../mock-context')

jest.mock('../../ffc-pay-event/alerts/check-if-alert')
const checkIfAlert = require('../../ffc-pay-event/alerts/check-if-alert')

jest.mock('../../ffc-pay-event/alerts/send-message-to-alerts')
const sendMessageToAlerts = require('../../ffc-pay-event/alerts/send-message-to-alerts')

let mockEvent

describe('Send alert if required', () => {
  beforeEach(() => {
    jest.resetModules()
    mockEvent = {
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
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('should call checkIfAlert when event given', async () => {
    sendAlert(mockContext, mockEvent)
    expect(checkIfAlert).toHaveBeenCalled()
  })

  test('should call sendMessageToAlerts when checkIfAlert returns true', async () => {
    checkIfAlert.mockReturnValue(true)

    sendAlert(mockContext, mockEvent)
    expect(sendMessageToAlerts).toHaveBeenCalled()
  })

  test('should call sendMessageToAlerts with mockContext and mockEvent when checkIfAlert returns true', async () => {
    checkIfAlert.mockReturnValue(true)

    sendAlert(mockContext, mockEvent)
    expect(sendMessageToAlerts).toHaveBeenCalledWith(mockContext, mockEvent)
  })

  test('should not call sendMessageToAlerts when checkIfAlert returns false', async () => {
    checkIfAlert.mockReturnValue(false)

    sendAlert(mockContext, mockEvent)
    expect(sendMessageToAlerts).not.toHaveBeenCalled()
  })
})
