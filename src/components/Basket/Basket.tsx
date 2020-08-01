import React from 'react'
import Button from 'react-bootstrap/Button'

import { OrdersBasketItem } from 'types/orders-basket'
import BasketTable from './BasketTable'

import appCss from '../App/App.module.css'
import css from './Basket.module.css'

type BasketProps = {
   ordersBasket: OrdersBasketItem[]
   handleBasketItemChange: (item: Partial<OrdersBasketItem>) => void
   handleOrderBooking: () => void
   handleOrderRemove: () => void
}

const bookDisabled = (ordersBasket: OrdersBasketItem[]) => {
   const bookCount = ordersBasket.filter(
      (item) =>
         item.selected &&
         (item.status === 'Ready' || item.status === 'Rejected'),
   ).length
   return (
      bookCount === 0 ||
      bookCount !== ordersBasket.filter((item) => item.selected).length
   )
}

const Basket: React.FC<BasketProps> = ({
   ordersBasket,
   handleBasketItemChange,
   handleOrderBooking,
   handleOrderRemove,
}) => {
   return (
      <div className={css.basket + ' ' + appCss['content-zoom-in']}>
         <Button
            disabled={bookDisabled(ordersBasket)}
            onClick={handleOrderBooking}
            data-test-id="book-button"
         >
            Book
         </Button>
         <Button
            disabled={ordersBasket.find((item) => item.selected) === undefined}
            variant="dark"
            onClick={handleOrderRemove}
            data-test-id="remove-button"
         >
            Remove
         </Button>
         <BasketTable
            ordersBasket={ordersBasket}
            handleBasketItemChange={handleBasketItemChange}
         />
      </div>
   )
}

export default Basket
