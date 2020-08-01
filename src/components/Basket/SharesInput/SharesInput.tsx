import React, { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'

import { OrderBasketEditProps } from 'types/orders-basket'

const SharesInput: React.FC<OrderBasketEditProps> = ({
   ordersBasketItem,
   handleBasketItemChange,
}) => {
   return (
      <Form.Control
         disabled={
            ordersBasketItem.status !== 'Not Ready' &&
            ordersBasketItem.status !== 'Ready'
         }
         id={`txtShares${ordersBasketItem.uuid}`}
         value={ordersBasketItem.shares || ''}
         onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const regex = new RegExp('^[0-9]*$')
            if (regex.test(e.currentTarget.value))
               handleBasketItemChange({
                  ...ordersBasketItem,
                  shares: Number(e.currentTarget.value),
               })
         }}
      />
   )
}

export default SharesInput
