const saveProjection = require('../ffc-pay-event/save-projection')
const mockContext = require('./mock-context')

describe('Save projection', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('Send a projection to outputSbTopic and outputSbTopic binding called if mandatory data', () => {
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

    saveProjection(mockContext, message)
    expect(mockContext.bindings).toHaveProperty('outputSbTopic')
  })
})
