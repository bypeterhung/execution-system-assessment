import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'
import { Provider } from 'react-redux'

import Header from 'components/App/Header'
import HeaderContainer from 'containers/HeaderContainer'
import { setupStore } from 'services/store/store-config'

const mockLocation = '/test'

const setup = () => {
   const wrapper = mount(
      <Provider store={setupStore({ ordersBasket: [mockOrdersBasketItem] })}>
         <MemoryRouter initialEntries={[mockLocation]}>
            <Route exact path={mockLocation}>
               <HeaderContainer />
            </Route>
         </MemoryRouter>
      </Provider>,
   )
   return { wrapper }
}
describe('HeaderContainer component', () => {
   it('should pass active props link and basket count', () => {
      const { wrapper } = setup()
      expect(wrapper.find(Header).props().activeLink).toBe(mockLocation)
      expect(wrapper.find(Header).props().basketCount).toBe(1)
   })
})
