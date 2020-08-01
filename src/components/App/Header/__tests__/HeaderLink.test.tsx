import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'

import HeaderLink from '../HeaderLink'

const setup = (active: boolean, children: React.ReactNode) => {
   const wrapper = shallow(
      <HeaderLink active={active} to="/test">
         {children}
      </HeaderLink>,
   )
   return wrapper
}

describe('HeaderLink component', () => {
   it('should set active css', () => {
      const wrapper = setup(true, null)
      expect(wrapper.find(Link).at(0).hasClass('active')).toBe(true)
   })

   it('should render children', () => {
      const mockChildren = 'test'
      const wrapper = setup(false, mockChildren)
      expect(wrapper.find(Link).at(0).text()).toBe(mockChildren)
   })
})
