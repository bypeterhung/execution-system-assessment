import React from 'react'
import { shallow } from 'enzyme'
import Form from 'react-bootstrap/Form'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'

import { OrdersBasketItem, OrderStatus } from 'types/orders-basket'
import SharesInput from '../SharesInput'

const handleBasketItemChange = jest.fn()
let wrapper: ReturnType<typeof shallow>

const setup = (ordersBasketItem: Partial<OrdersBasketItem>) => {
   wrapper = shallow(
      <SharesInput
         ordersBasketItem={ordersBasketItem as OrdersBasketItem}
         handleBasketItemChange={handleBasketItemChange}
      />,
   )
}

describe('ShareInput component', () => {
   it('should be disabled when item status is not Ready or Not Ready', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         status: 'Booked' as OrderStatus,
      }
      setup(basketItem)
      expect(wrapper.find(Form.Control).props().disabled).toBe(true)
      wrapper.setProps({ ordersBasketItem: { ...basketItem, status: 'Ready' } })
      expect(wrapper.find(Form.Control).props().disabled).toBe(false)
   })

   it('should handle basket item change', () => {
      const shares = 1000
      setup(mockOrdersBasketItem)
      const event = {
         currentTarget: { value: String(shares) },
      } as React.ChangeEvent<HTMLInputElement>
      wrapper.find(Form.Control).simulate('change', event)
      expect(handleBasketItemChange.mock.calls[0][0].shares).toBe(shares)
   })

   it('should ignore non numeric input', () => {
      setup(mockOrdersBasketItem)
      const event = {
         currentTarget: { value: '123a' },
      } as React.ChangeEvent<HTMLInputElement>
      wrapper.find(Form.Control).simulate('change', event)
      expect(handleBasketItemChange.mock.calls.length).toBe(0)
   })

   it('should set input value to empty string when item shares is undefined', () => {
      const basketItem = {
         ...mockOrdersBasketItem,
         shares: undefined,
      }
      setup(basketItem)
      expect(wrapper.find(Form.Control).props().value).toBe('')
   })
})
