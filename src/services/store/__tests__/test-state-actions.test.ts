import { testStateActionTypes, testStateAdd, testStateDelete } from '../test-state-actions'

describe('test-state action', () => {
   it('should handle add item', () => {
      const mockValue = 'test'
      expect(testStateAdd(mockValue)).toEqual({
         type: testStateActionTypes.TEST_ADD,
         payload: { value: mockValue },
      })
   })

   it('should handle remove items', () => {
      expect(testStateDelete()).toEqual({
         type: testStateActionTypes.TEST_DELETE,
      })
   })
})
