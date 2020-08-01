import React from 'react'
import { shallow } from 'enzyme'

import Header from '../Header'
import HeaderLink from '../HeaderLink'

const activeLink = '/stocks'

let wrapper: ReturnType<typeof shallow>

const setup = () => {
   wrapper = shallow(<Header activeLink={activeLink} basketCount={0} />)
}

describe('Header component', () => {
   beforeEach(() => setup())

   it('should render link with active props', () => {
      expect(
         wrapper
            .find(HeaderLink)
            .filter('[to="' + activeLink + '"]')
            .props().active,
      ).toBe(true)

      expect(
         wrapper.find(HeaderLink).filter('[to="/basket"]').props().active,
      ).toBe(false)
   })
})
