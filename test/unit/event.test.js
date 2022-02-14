const saveEvent = require('../../app/index')
jest.mock('../../app/storage')
const queryEntities = require('../../app/storage')
const mockContext = require('../mock-context')

describe('save event function', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  test('save event, with no duplication or creation of projection', async () => {
    queryEntities.mockResolvedValue([])
    const message = {
      properties: {
        id: 123456789,
        status: 'in progress',
        action: {
          timestamp: '2020-01-01T00:00:00.000Z',
          type: 'create'
        }
      }
    }

    const response = await saveEvent(mockContext, message)
    console.log('xxxxxxx', response)
    expect(response).toEqual(false)
    expect(queryEntities).toHaveBeenCalledTimes(1)
  })
})
