import React from 'react'
import { mount } from 'enzyme'

import useApi, { ApiPayload, ApiResult } from 'hooks/use-api'

const setup = (
   mockApiFunc: (payload: any) => Promise<any>,
   initialPayload?: ApiPayload,
   initialResultState?: ApiResult,
) => {
   const MockChild = ({
      mockApiResult,
      setMockApiPayload,
   }: {
      mockApiResult: ApiResult
      setMockApiPayload: React.Dispatch<React.SetStateAction<ApiPayload>>
   }) => (
      <div>
         mock component
         {mockApiResult && ''}
         {setMockApiPayload && ''}
      </div>
   )
   const MockComponent = () => {
      const [mockApiResult, setMockApiPayload] = useApi(
         mockApiFunc,
         initialPayload,
         initialResultState,
      )
      return (
         <MockChild
            mockApiResult={mockApiResult}
            setMockApiPayload={setMockApiPayload}
         />
      )
   }
   const wrapper = mount(<MockComponent />)
   return { wrapper, MockChild }
}

describe('use-api component', () => {
   it('should pass initial api result', () => {
      const initialResultState = { data: [], loading: false }
      const { wrapper, MockChild } = setup(
         () => Promise.resolve([]),
         undefined,
         initialResultState,
      )
      expect(wrapper.find(MockChild).props().mockApiResult).toEqual(
         initialResultState,
      )
   })

   it('should handle initial payload and pass api result', async () => {
      const apiResult = ['result']
      const { wrapper, MockChild } = setup(() => Promise.resolve(apiResult), {
         payload: 'test',
      })
      await new Promise((resolve) => setTimeout(resolve, 0))
      wrapper.update()
      expect(wrapper.find(MockChild).props().mockApiResult).toEqual({
         data: apiResult,
         loading: false,
         error: undefined,
      })
   })

   it('should handle api error', async () => {
      const apiError = 'api error'
      const { wrapper, MockChild } = setup(() => Promise.reject(apiError))
      wrapper.find(MockChild).props().setMockApiPayload({ payload: 'test' })
      await new Promise((resolve) => setTimeout(resolve, 0))
      wrapper.update()
      expect(wrapper.find(MockChild).props().mockApiResult).toEqual({
         data: undefined,
         loading: false,
         error: apiError,
      })
   })
})
