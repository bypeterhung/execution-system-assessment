import React from 'react'
import { shallow } from 'enzyme'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'

import { ExecutionMode, OrdersBasketItem, OrderStatus } from 'types/orders-basket'
import ExecutionModeDropdown from '../ExecutionModeDropdown'

const handleBasketItemChange = jest.fn()
let wrapper: ReturnType<typeof shallow>

const setup = (ordersBasketItem: Partial<OrdersBasketItem>) => {
   wrapper = shallow(
      <ExecutionModeDropdown
         ordersBasketItem={ordersBasketItem as OrdersBasketItem}
         handleBasketItemChange={handleBasketItemChange}
      />,
   )
}

describe('ExecutionModeDropdown component', () => {
   it('should be disabled when item status is not Ready or Not Ready', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         status: 'Booked' as OrderStatus,
      }
      setup(basketItem)
      expect(wrapper.find(DropdownButton).props().disabled).toBe(true)
      wrapper.setProps({ ordersBasketItem: { ...basketItem, status: 'Ready' } })
      expect(wrapper.find(DropdownButton).props().disabled).toBe(false)
   })

   it('should handle basket item change', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         executionMode: undefined,
      }
      setup(basketItem)
      const mode = 'Limit' as ExecutionMode
      wrapper
         .find(Dropdown.Item)
         .filterWhere((n) => n.text() === mode)
         .at(0)
         .props()
         .onClick()
      expect(handleBasketItemChange.mock.calls[0][0].executionMode).toBe(mode)
   })

   it('should clear orderPrice when basket item change is set to Market', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         executionMode: undefined,
      }
      setup(basketItem)
      const mode = 'Market' as ExecutionMode
      wrapper
         .find(Dropdown.Item)
         .filterWhere((n) => n.text() === mode)
         .at(0)
         .props()
         .onClick()
      expect(handleBasketItemChange.mock.calls[0][0].executionMode).toBe(mode)
      expect(handleBasketItemChange.mock.calls[0][0].orderPrice).toBe(undefined)
   })
})
