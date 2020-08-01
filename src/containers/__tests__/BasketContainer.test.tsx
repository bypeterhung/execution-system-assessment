import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'

import BasketContainer from 'containers/BasketContainer'
import { ordersBasketBookActionTypes } from 'services/store/orders-basket-actions'
import { setupStore } from 'services/store/store-config'
import { OrdersBasketItem } from 'types/orders-basket'
import Basket from '../../components/Basket'

const mockDispatch = jest.fn()
const mockBasketBookThunk = jest.fn()

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => mockDispatch,
}))

jest.mock('../../services/store/orders-basket-actions', () => ({
   ...jest.requireActual('../../services/store/orders-basket-actions'),
   ordersBasketBook: () => mockBasketBookThunk,
}))

const setup = (ordersBasket: OrdersBasketItem[]) => {
   const appState = setupStore({
      ordersBasket,
   })
   const wrapper = mount(
      <Provider store={appState}>
         <BasketContainer />
      </Provider>,
   )
   return {
      wrapper,
      appState,
   }
}

describe('BasketContainer component', () => {
   it('should handle order booking', () => {
      const item = {
         ...mockOrdersBasketItem,
         selected: true,
         status: 'Ready' as const,
      }
      const { wrapper } = setup([item as OrdersBasketItem])
      wrapper.find(Basket).props().handleOrderBooking()
      expect(mockDispatch).toBeCalled()
      mockDispatch.mock.calls[0][0]()
      expect(mockBasketBookThunk).toBeCalled()
   })

   it('should not book order if status is Not Ready', () => {
      const item = {
         ...mockOrdersBasketItem,
         selected: true,
         status: 'Not Ready' as const,
      }
      const { wrapper } = setup([item as OrdersBasketItem])
      wrapper.find(Basket).props().handleOrderBooking()
      expect(mockDispatch).not.toBeCalled()
   })

   it('should handle removing order', () => {
      const item = {
         ...mockOrdersBasketItem,
         selected: true,
         status: 'Rejected',
      }
      const { wrapper } = setup([item as OrdersBasketItem])
      wrapper.find(Basket).props().handleOrderRemove()
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: ordersBasketBookActionTypes.ORDERS_BASKET_REMOVE,
      })
   })

   it('should handle basket item edit', () => {
      const item = {
         ...mockOrdersBasketItem,
         selected: true,
      }
      const { wrapper } = setup([
         { ...item, selected: false } as OrdersBasketItem,
      ])
      wrapper.find(Basket).props().handleBasketItemChange(item)
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: ordersBasketBookActionTypes.ORDERS_BASKET_EDIT,
         payload: item,
      })
   })
})
