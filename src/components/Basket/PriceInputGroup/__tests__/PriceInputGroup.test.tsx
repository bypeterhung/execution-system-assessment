import React from 'react'
import { shallow } from 'enzyme'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'

import { ExecutionMode, OrdersBasketItem, OrderStatus } from 'types/orders-basket'
import PriceInputGroup from '../PriceInputGroup'

const handleBasketItemChange = jest.fn()
let wrapper: ReturnType<typeof shallow>

const setup = (ordersBasketItem: Partial<OrdersBasketItem>) => {
   wrapper = shallow(
      <PriceInputGroup
         ordersBasketItem={ordersBasketItem as OrdersBasketItem}
         handleBasketItemChange={handleBasketItemChange}
      />,
   )
}

describe('PriceInputGroup component', () => {
   it('should be disabled when item status is not Ready or Not Ready', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         status: 'Booked' as OrderStatus,
      }
      setup(basketItem)
      expect(wrapper.find(Form.Control).props().disabled).toBe(true)
      expect(wrapper.find(DropdownButton).props().disabled).toBe(true)
      wrapper.setProps({ ordersBasketItem: { ...basketItem, status: 'Ready' } })
      expect(wrapper.find(Form.Control).props().disabled).toBe(false)
      expect(wrapper.find(DropdownButton).props().disabled).toBe(false)
   })

   it('should be disabled when item execution mode is Market', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         executionMode: 'Market' as ExecutionMode,
      }
      setup(basketItem)
      expect(wrapper.find(Form.Control).props().disabled).toBe(true)
      expect(wrapper.find(DropdownButton).props().disabled).toBe(true)
      wrapper.setProps({
         ordersBasketItem: { ...basketItem, executionMode: 'Limit' },
      })
      expect(wrapper.find(Form.Control).props().disabled).toBe(false)
      expect(wrapper.find(DropdownButton).props().disabled).toBe(false)
   })

   it('should handle item price change', () => {
      const price = '123.45'
      setup(mockOrdersBasketItem)
      const event = {
         currentTarget: { value: price },
      } as React.ChangeEvent<HTMLInputElement>
      wrapper.find(Form.Control).simulate('change', event)
      expect(handleBasketItemChange.mock.calls[0][0].orderPrice).toBe(price)
   })

   it('should handle item currency change', () => {
      setup(mockOrdersBasketItem)
      const originalCurrency = mockOrdersBasketItem.currency
      wrapper
         .find(Dropdown.Item)
         .filterWhere((n) => n.key() !== originalCurrency)
         .at(0)
         .props()
         .onClick()
      expect(handleBasketItemChange.mock.calls[0][0].currency).not.toBe(
         originalCurrency,
      )
      expect(
         handleBasketItemChange.mock.calls[0][0].currency.length,
      ).toBeGreaterThan(0)
   })

   it('should ignore non numeric input', () => {
      setup(mockOrdersBasketItem)
      const event = {
         currentTarget: { value: '123a' },
      } as React.ChangeEvent<HTMLInputElement>
      wrapper.find(Form.Control).simulate('change', event)
      expect(handleBasketItemChange.mock.calls.length).toBe(0)
   })

   it('should set input value to empty string when item price is undefined', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         orderPrice: undefined,
      }
      setup(basketItem)
      expect(wrapper.find(Form.Control).props().value).toBe('')
   })
})
