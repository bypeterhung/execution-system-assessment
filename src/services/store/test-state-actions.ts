export const testStateActionTypes = {
   TEST_ADD: 'TEST_ADD' as const,
   TEST_DELETE: 'TEST_DELETE' as const,
}

export type TestStateActions =
   | ReturnType<typeof testStateAdd>
   | ReturnType<typeof testStateDelete>

export const testStateAdd = (value: string) => ({
   type: testStateActionTypes.TEST_ADD,
   payload: { value },
})

export const testStateDelete = () => ({
   type: testStateActionTypes.TEST_DELETE,
})
