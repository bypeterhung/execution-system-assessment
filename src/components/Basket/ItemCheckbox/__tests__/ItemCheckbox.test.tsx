import React from 'react'
import { shallow } from 'enzyme'
import Form from 'react-bootstrap/Form'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'

import { OrdersBasketItem, OrderStatus } from 'types/orders-basket'
import ItemCheckbox from '../ItemCheckbox'

const handleBasketItemChange = jest.fn()
let wrapper: ReturnType<typeof shallow>

const setup = (ordersBasketItem: Partial<OrdersBasketItem>) => {
   wrapper = shallow(
      <ItemCheckbox
         ordersBasketItem={ordersBasketItem as OrdersBasketItem}
         handleBasketItemChange={handleBasketItemChange}
      />,
   )
}

describe('ItemCheckbox component', () => {
   it('should be disabled when item status is In Progress', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         status: 'In Progress' as OrderStatus,
      }
      setup(basketItem)
      expect(wrapper.find(Form.Check).props().disabled).toBe(true)
      wrapper.setProps({ ordersBasketItem: { ...basketItem, status: 'Ready' } })
      expect(wrapper.find(Form.Check).props().disabled).toBe(false)
   })

   it('should handle basket item change', () => {
      setup(mockOrdersBasketItem)
      wrapper.find(Form.Check).simulate('change')
      expect(handleBasketItemChange.mock.calls[0][0].selected).toBe(
         !mockOrdersBasketItem.selected,
      )
   })
})
