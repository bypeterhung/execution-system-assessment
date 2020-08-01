import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import { OrderBasketEditProps } from 'types/orders-basket'

import css from './ExecutionModeDropdown.module.css'

const ExecutionModeDropdown: React.FC<OrderBasketEditProps> = ({
   ordersBasketItem,
   handleBasketItemChange,
}) => {
   return (
      <DropdownButton
         className={css['execution-mode']}
         variant="light"
         id="dropdown-basic-button"
         title={ordersBasketItem.executionMode}
         disabled={
            ordersBasketItem.status !== 'Not Ready' &&
            ordersBasketItem.status !== 'Ready'
         }
      >
         <Dropdown.Item
            onClick={() => {
               handleBasketItemChange({
                  ...ordersBasketItem,
                  executionMode: 'Limit',
               })
            }}
         >
            Limit
         </Dropdown.Item>
         <Dropdown.Item
            onClick={() => {
               handleBasketItemChange({
                  ...ordersBasketItem,
                  executionMode: 'Market',
                  orderPrice: undefined,
               })
            }}
         >
            Market
         </Dropdown.Item>
      </DropdownButton>
   )
}

export default ExecutionModeDropdown
