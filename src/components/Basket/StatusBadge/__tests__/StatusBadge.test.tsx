import React from 'react'
import { shallow } from 'enzyme'

import StatusBadge from '../StatusBadge'

let wrapper: ReturnType<typeof shallow>

const setup = () => {
   wrapper = shallow(<StatusBadge status="Ready" />)
}

describe('StatusBadge component', () => {
   it('should set the correct css class', () => {
      setup()
      expect(wrapper.find('span').props().className).toBe('badge badge-primary')
   })
})
