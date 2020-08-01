import React from 'react'
import Form from 'react-bootstrap/Form'

import { OrderBasketEditProps } from 'types/orders-basket'

import css from './ItemCheckbox.module.css'

const ItemCheckbox: React.FC<OrderBasketEditProps> = ({
   ordersBasketItem,
   handleBasketItemChange,
}) => {
   return (
      <Form.Check
         disabled={ordersBasketItem.status === 'In Progress'}
         className={css.checkbox}
         checked={ordersBasketItem.selected}
         custom
         inline
         label=""
         type="checkbox"
         id={`ck${ordersBasketItem.uuid}`}
         onChange={() => {
            handleBasketItemChange({
               ...ordersBasketItem,
               selected: !ordersBasketItem.selected,
            })
         }}
      />
   )
}

export default ItemCheckbox
