import React from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

import { OrdersBasketItem } from 'types/orders-basket'
import BasketTableRow from './BasketTableRow'

import css from './BasketTable.module.css'

type BasketProps = {
   ordersBasket: OrdersBasketItem[]
   handleBasketItemChange: (item: Partial<OrdersBasketItem>) => void
}

const BasketTable: React.FC<BasketProps> = ({
   ordersBasket,
   handleBasketItemChange,
}) => {
   const handleCheckAll = () => {
      if (
         ordersBasket.filter(
            (item) => !item.selected && item.status !== 'In Progress',
         ).length === 0
      ) {
         ordersBasket.forEach((item) => {
            // if (item.status !== 'In Progress' && item.selected) inferred under the above if clause
            handleBasketItemChange({ ...item, selected: false })
         })
      } else {
         ordersBasket.forEach((item) => {
            if (item.status !== 'In Progress' && !item.selected) {
               handleBasketItemChange({ ...item, selected: true })
            }
         })
      }
   }
   return (
      <Table striped className={css.table}>
         <thead>
            <tr>
               <th className="text-center">
                  <Form.Check
                     className={css.checkbox}
                     checked={
                        ordersBasket.filter(
                           (item) =>
                              !item.selected && item.status !== 'In Progress',
                        ).length === 0 &&
                        ordersBasket.find((item) => item.selected) !== undefined
                     }
                     custom
                     inline
                     label=""
                     type="checkbox"
                     id="ckOrdersBasketCheckAll"
                     onChange={handleCheckAll}
                  />
               </th>
               <th>Status</th>
               <th>Side</th>
               <th>Stock Code</th>
               <th>Execution Mode</th>
               <th>Order Price</th>
               <th>Amount (Shares)</th>
            </tr>
         </thead>
         <tbody>
            {ordersBasket.length === 0 ? (
               <tr>
                  <td
                     colSpan={7}
                     className="text-center"
                     data-test-id="basket-empty"
                  >
                     Basket is empty.
                  </td>
               </tr>
            ) : (
               ordersBasket.map((item) => (
                  <BasketTableRow
                     key={item.uuid}
                     item={item}
                     handleBasketItemChange={handleBasketItemChange}
                     data-test-id="basket-item"
                  />
               ))
            )}
         </tbody>
      </Table>
   )
}

export default BasketTable
