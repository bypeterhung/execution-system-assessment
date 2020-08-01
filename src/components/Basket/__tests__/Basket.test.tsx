import React from 'react'
import { shallow } from 'enzyme'
import Button from 'react-bootstrap/Button'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'

import { OrdersBasketItem } from 'types/orders-basket'
import Basket from '../Basket'

const setup = (ordersBasket: OrdersBasketItem[]) => {
   const handleOrderBooking = jest.fn()
   const handleOrderRemove = jest.fn()
   const wrapper = shallow(
      <Basket
         ordersBasket={ordersBasket}
         handleBasketItemChange={() => {}}
         handleOrderBooking={handleOrderBooking}
         handleOrderRemove={handleOrderRemove}
      />,
   )
   return { wrapper, handleOrderBooking, handleOrderRemove }
}

describe('Basket component', () => {
   it('should not disable Book button when only item with  Ready / Rejected status selected', () => {
      let { wrapper } = setup([
         { ...mockOrdersBasketItem, selected: true, status: 'Ready' },
         { ...mockOrdersBasketItem, selected: true, status: 'Rejected' },
      ])
      expect(
         wrapper.find('Button[data-test-id="book-button"]').props().disabled,
      ).toBe(false)

      wrapper = setup([
         { ...mockOrdersBasketItem, selected: false, status: 'Ready' },
         { ...mockOrdersBasketItem, selected: false, status: 'Rejected' },
      ]).wrapper
      expect(
         wrapper.find('Button[data-test-id="book-button"]').props().disabled,
      ).toBe(true)

      wrapper = setup([
         { ...mockOrdersBasketItem, selected: true, status: 'Ready' },
         { ...mockOrdersBasketItem, selected: true, status: 'Rejected' },
         { ...mockOrdersBasketItem, selected: true, status: 'Booked' },
      ]).wrapper
      expect(
         wrapper.find('Button[data-test-id="book-button"]').props().disabled,
      ).toBe(true)
   })

   it('should handle order booking', () => {
      const item = {
         ...mockOrdersBasketItem,
         selected: true,
         status: 'Rejected',
      }
      const { wrapper, handleOrderBooking } = setup([item as OrdersBasketItem])
      expect(handleOrderBooking).not.toBeCalled()
      wrapper
         .find(Button)
         .filter('[data-test-id="book-button"]')
         .simulate('click')
      expect(handleOrderBooking).toBeCalled()
   })

   it('should ignore order booking when item status is not Ready or Rejected', () => {
      const item = {
         ...mockOrdersBasketItem,
         selected: true,
         status: 'Not Ready',
      }
      const { wrapper } = setup([item as OrdersBasketItem])
      wrapper
         .find(Button)
         .filter('[data-test-id="book-button"]')
         .simulate('click')
      expect(
         wrapper.find(Button).filter('[data-test-id="book-button"]').props()
            .disabled,
      ).toBe(true)
   })

   it('should handle removing order', () => {
      const item = {
         ...mockOrdersBasketItem,
         selected: true,
         status: 'Rejected',
      }
      const { wrapper, handleOrderRemove } = setup([item as OrdersBasketItem])
      expect(handleOrderRemove).not.toBeCalled()
      wrapper
         .find(Button)
         .filter('[data-test-id="remove-button"]')
         .simulate('click')
      expect(handleOrderRemove).toBeCalled()
   })

   it('should not disable Book button when at least one item selected', () => {
      const { wrapper } = setup([
         { ...mockOrdersBasketItem, selected: false, status: 'Ready' },
         { ...mockOrdersBasketItem, selected: true, status: 'Rejected' },
      ])
      expect(
         wrapper.find('Button[data-test-id="book-button"]').props().disabled,
      ).toBe(false)
      const { wrapper: wrapper2 } = setup([
         { ...mockOrdersBasketItem, selected: false, status: 'Ready' },
         { ...mockOrdersBasketItem, selected: false, status: 'Rejected' },
      ])
      expect(
         wrapper2.find('Button[data-test-id="book-button"]').props().disabled,
      ).toBe(true)
   })
})
