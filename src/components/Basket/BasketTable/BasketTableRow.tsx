import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import { OrdersBasketItem } from 'types/orders-basket'
import ExecutionModeDropdown from '../ExecutionModeDropdown'
import ItemCheckbox from '../ItemCheckbox'
import PriceInputGroup from '../PriceInputGroup'
import SharesInput from '../SharesInput'
import StatusBadge from '../StatusBadge'

import css from './BasketTableRow.module.css'

type BasketTableRowProps = {
   item: OrdersBasketItem
   handleBasketItemChange: (item: Partial<OrdersBasketItem>) => void
}

const BasketTableRow: React.FC<BasketTableRowProps> = ({
   item,
   handleBasketItemChange,
}) => {
   return (
      <tr className={item.error ? css.error : ''} key={item.uuid}>
         <td className="text-center">
            <ItemCheckbox
               ordersBasketItem={item}
               handleBasketItemChange={handleBasketItemChange}
            />
            {item.error && (
               <Alert variant="danger" className={css.alert}>
                  Error: {item.error}
                  <Button
                     onClick={() =>
                        handleBasketItemChange({
                           ...item,
                           error: undefined,
                        })
                     }
                     variant="light"
                     size="sm"
                  >
                     Close
                  </Button>
               </Alert>
            )}
         </td>
         <td>
            <StatusBadge status={item.status} />
         </td>
         <td>{item.orderAction}</td>
         <td>{item.stockCode}</td>
         <td>
            <ExecutionModeDropdown
               ordersBasketItem={item}
               handleBasketItemChange={handleBasketItemChange}
            />
         </td>
         <td>
            <PriceInputGroup
               ordersBasketItem={item}
               handleBasketItemChange={handleBasketItemChange}
            />
         </td>
         <td>
            <SharesInput
               ordersBasketItem={item}
               handleBasketItemChange={handleBasketItemChange}
            />
         </td>
      </tr>
   )
}

export default BasketTableRow
