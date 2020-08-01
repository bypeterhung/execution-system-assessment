import React, { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import { OrderBasketEditProps } from 'types/orders-basket'

const currency = ['HKD', 'USD', 'AUD', 'EUR', 'SGD']

const PriceInputGroup: React.FC<OrderBasketEditProps> = ({
   ordersBasketItem,
   handleBasketItemChange,
}) => {
   const disabled =
      ordersBasketItem.executionMode === 'Market' ||
      (ordersBasketItem.status !== 'Not Ready' &&
         ordersBasketItem.status !== 'Ready')

   return (
      <InputGroup>
         <Form.Control
            disabled={disabled}
            id={`txtPrice${ordersBasketItem.uuid}`}
            value={ordersBasketItem.orderPrice || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               const regex = new RegExp('^-?[0-9]\\d*\\.?\\d*$') // for decimal
               if (regex.test(e.currentTarget.value))
                  handleBasketItemChange({
                     ...ordersBasketItem,
                     orderPrice: e.currentTarget.value,
                  })
            }}
         />
         <DropdownButton
            disabled={disabled}
            as={InputGroup.Append}
            variant="outline-secondary"
            title={ordersBasketItem.currency}
            id="currency-dropdown"
         >
            {currency.map((cur) => (
               <Dropdown.Item
                  onClick={() =>
                     handleBasketItemChange({
                        ...ordersBasketItem,
                        currency: cur,
                     })
                  }
                  key={cur}
               >
                  {cur}
               </Dropdown.Item>
            ))}
         </DropdownButton>
      </InputGroup>
   )
}

export default PriceInputGroup
