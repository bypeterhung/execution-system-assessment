import { TestStateActions, testStateActionTypes } from './test-state-actions'

// add to make sure combineReducers typings work properly
export default function testState(
   state: string[] = [],
   action: TestStateActions,
): string[] {
   switch (action.type) {
      case testStateActionTypes.TEST_ADD:
         return [action.payload.value]
      case testStateActionTypes.TEST_DELETE:
         return []
      default:
         return state
   }
}
