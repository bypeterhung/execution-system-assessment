import React from 'react'
import { shallow } from 'enzyme'
import Form from 'react-bootstrap/Form'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'

import { OrdersBasketItem } from 'types/orders-basket'
import BasketTable from '../BasketTable'

const setup = (ordersBasket: OrdersBasketItem[]) => {
   const handleBasketItemChange = jest.fn()
   const wrapper = shallow(
      <BasketTable
         ordersBasket={ordersBasket}
         handleBasketItemChange={handleBasketItemChange}
      />,
   )
   return {
      wrapper,
      handleBasketItemChange,
   }
}

describe('BasketTable component', () => {
   it('should render empty basket message', () => {
      const { wrapper } = setup([])
      expect(wrapper.find('[data-test-id="basket-empty"]').length).toBe(1)
   })

   it('should render order basket items', () => {
      const { wrapper } = setup([
         mockOrdersBasketItem,
         mockOrdersBasketItem,
         mockOrdersBasketItem,
      ])
      expect(wrapper.find('[data-test-id="basket-item"]').length).toBe(3)
   })

   it('should handle check all when there is uncheck item', () => {
      const { wrapper, handleBasketItemChange } = setup([
         { ...mockOrdersBasketItem, selected: true },
         { ...mockOrdersBasketItem, selected: false, status: 'In Progress' },
         { ...mockOrdersBasketItem, selected: false },
         { ...mockOrdersBasketItem, selected: false },
      ])
      expect(wrapper.find(Form.Check).props().checked).toBe(false)
      wrapper.find(Form.Check).simulate('change')
      expect(handleBasketItemChange.mock.calls.length).toBe(2) // selected = true and status = In Progress are ignored
      expect(handleBasketItemChange.mock.calls[0][0].selected).toBe(true)
      expect(handleBasketItemChange.mock.calls[1][0].selected).toBe(true)
   })

   it('should handle uncheck all when all items are checked', () => {
      const { wrapper, handleBasketItemChange } = setup([
         { ...mockOrdersBasketItem, selected: true },
         { ...mockOrdersBasketItem, selected: true },
      ])
      expect(wrapper.find(Form.Check).props().checked).toBe(true)
      wrapper.find(Form.Check).simulate('change')
      expect(handleBasketItemChange.mock.calls.length).toBe(2)
      expect(handleBasketItemChange.mock.calls[0][0].selected).toBe(false)
      expect(handleBasketItemChange.mock.calls[1][0].selected).toBe(false)
   })
})
