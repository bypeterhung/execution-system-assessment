import testState from '../test-state'
import { testStateActionTypes } from '../test-state-actions'

describe('test-state reducer', () => {
   it('should add value to test-state ', () => {
      const testValue = 'test'
      expect(
         testState([], {
            type: testStateActionTypes.TEST_ADD,
            payload: { value: testValue },
         }),
      ).toEqual([testValue])
   })

   it('should delete test-state ', () => {
      const testValue = 'test'
      expect(
         testState([testValue], {
            type: testStateActionTypes.TEST_DELETE,
         }),
      ).toEqual([])
   })

   it('should set default state and return original state when action type is not matched', () => {
      // no get around for type error in order to cover switch default case
      // @ts-ignore
      expect(testState(undefined, { type: 'mock action' })).toEqual([])
   })
})
