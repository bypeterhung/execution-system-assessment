import React from 'react'
import { shallow } from 'enzyme'
import Button from 'react-bootstrap/Button'

import ErrorBoundary from '../ErrorBoundary'

let wrapper: ReturnType<typeof shallow>

const setup = () => {
   const SampleChild = () => null
   wrapper = shallow(
      <ErrorBoundary>
         <SampleChild />
      </ErrorBoundary>,
   )
   const error = new Error('Sample error')
   wrapper.find(SampleChild).simulateError(error)
}

describe('ErrorBoundary component', () => {
   beforeEach(() => {
      setup()
   })

   it('should display an ErrorMessage if wrapped component throws', () => {
      expect(wrapper.find('[data-test-id="error-content"]').length).toBe(1)
   })

   it('should refresh page if user click refresh', () => {
      window.location.reload = jest.fn()

      wrapper.find(Button).simulate('click')
      expect(window.location.reload).toBeCalled()
   })
})
