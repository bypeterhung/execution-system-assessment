import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

import AppRoute from '../AppRoute'
import Header from '../Header'

jest.mock('../../../hooks/use-typed-selector', () => ({
   __esModule: true,
   default: () => 0,
}))

describe('AppRoute Component', () => {
   it('should render Header and children', () => {
      const Child = () => <div>test</div>
      const wrapper = mount(
         <MemoryRouter initialEntries={['/test']}>
            <AppRoute exact path="/test">
               <Child />
            </AppRoute>
         </MemoryRouter>,
      )
      expect(wrapper.find(Child).length).toBe(1)
      expect(wrapper.find(Header).length).toBe(1)
   })
})
