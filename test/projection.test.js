const { checkCreateProjection } = require('../ffc-pay-event/projection')
const mockContext = require('./mock-context')

describe('Projection function', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('No projection to be sent to outputSbTopic and outputSbTopic binding not called', async () => {
    const message = {
      id: '123456789',
      action: {
        type: 'create'
      }
    }

    const checkProjection = checkCreateProjection(mockContext, message)
    expect(checkProjection).toEqual(false)
    expect(mockContext.bindings).not.toHaveProperty('outputSbTopic')
  })

  test('Does not send a projection to outputSbTopic and outputSbTopic binding called if no mandatory data', async () => {
    const message = {
      id: '123456789',
      action: {
        type: 'submission'
      }
    }

    checkCreateProjection(mockContext, message)
    expect(mockContext.bindings).not.toHaveProperty('outputSbTopic')
  })

  test('Send a projection to outputSbTopic and outputSbTopic binding called if mandatory data', async () => {
    const message = {
      id: '123456789',
      action: {
        type: 'submission',
        data: {
          paymentRequest: {
            frn: 1234567890,
            paymentRequestNumber: 1,
            agreementNumber: 'SIP123456789012345'
          }
        }
      }
    }

    const checkProjection = checkCreateProjection(mockContext, message)
    expect(checkProjection).toEqual(true)
    expect(mockContext.bindings).toHaveProperty('outputSbTopic')
  })
})
