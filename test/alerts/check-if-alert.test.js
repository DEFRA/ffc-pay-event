const checkIfAlert = require('../../ffc-pay-event/alerts/check-if-alert')

describe('Check if event is an alert', () => {
  test('should return true when messageType is "error"', async () => {
    const result = checkIfAlert('error')
    expect(result).toBe(true)
  })

  test('should return true when messageType is "blocked"', async () => {
    const result = checkIfAlert('blocked')
    expect(result).toBe(true)
  })

  test('should return false when messageType is "true"', async () => {
    const result = checkIfAlert('true')
    expect(result).toBe(false)
  })

  test('should return false when messageType is "string"', async () => {
    const result = checkIfAlert('string')
    expect(result).toBe(false)
  })

  test('should return false when messageType is ""', async () => {
    const result = checkIfAlert('')
    expect(result).toBe(false)
  })

  test('should return false when messageType is a number', async () => {
    const result = checkIfAlert(0)
    expect(result).toBe(false)
  })

  test('should return false when messageType is 1', async () => {
    const result = checkIfAlert(1)
    expect(result).toBe(false)
  })
})
