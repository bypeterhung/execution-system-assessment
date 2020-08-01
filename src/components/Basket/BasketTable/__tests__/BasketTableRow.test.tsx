import React from 'react'
import { shallow } from 'enzyme'
import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import { OrdersBasketItem } from 'types/orders-basket'
import BasketTableRow from '../BasketTableRow'

const setup = (basketItem: OrdersBasketItem) => {
   const handleBasketItemChange = jest.fn()
   const wrapper = shallow(
      <BasketTableRow
         item={basketItem}
         handleBasketItemChange={handleBasketItemChange}
      />,
   )
   return { wrapper, handleBasketItemChange }
}

describe('BasketTableRow Component', () => {
   it('should render order basket item with error and handle close error click', () => {
      const error = 'test error'
      const { wrapper, handleBasketItemChange } = setup(mockOrdersBasketItem)
      expect(wrapper.find(Alert).length).toBe(0)
      wrapper.setProps({
         item: {
            ...mockOrdersBasketItem,
            error,
         },
      })
      expect(wrapper.find(Alert).text()).toMatch(error)
      wrapper.find(Alert).find(Button).props().onClick()
      expect(handleBasketItemChange.mock.calls[0][0].error).toBe(undefined)
   })
})
