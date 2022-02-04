const processEvent = require('../../process-event')
const mockContext = require('../mock-context')

describe('calculation function', () => {
  test('sends request for projection when event received', async () => {
    const message = {
      id: 123456789
    }

    mockContext.bindings.outputSbTopic = message

    await processEvent(mockContext, message)
    expect(mockContext.done.mock.calls.length).toEqual(1)
    expect(mockContext.bindings.outputSbTopic).toEqual(message)
  })

  test('sends request for projection message id is checked', async () => {
    const message = {
    }

    mockContext.bindings.outputSbTopic = message

    await processEvent(mockContext, message)
    expect(mockContext.done.mock.calls.length).toEqual(1)
  })

  test('an error is thrown (and logged) when an error occurs', async () => {
    await expect(processEvent(mockContext)).rejects.toThrow(Error)

    expect(mockContext.log.error).toHaveBeenCalledTimes(1)
  })
})
