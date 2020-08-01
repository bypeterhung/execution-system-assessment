import React from 'react'
import { useDispatch } from 'react-redux'

import Basket from 'components/Basket'
import useTypedSelector from 'hooks/use-typed-selector'
import {
    ordersBasketBook, ordersBasketEdit, ordersBasketRemove
} from 'services/store/orders-basket-actions'
import { OrdersBasketItem } from '../types/orders-basket'

const BasketContainer = () => {
   const dispatch = useDispatch()
   const basket = useTypedSelector((state) => {
      return state.ordersBasket
   })

   const handleBasketItemChange = (item: Partial<OrdersBasketItem>) => {
      dispatch(ordersBasketEdit(item))
   }

   const handleOrderBooking = () => {
      basket.forEach((item) => {
         if (
            item.selected &&
            (item.status === 'Ready' || item.status === 'Rejected')
         ) {
            dispatch(ordersBasketBook(item))
         }
      })
   }

   const handleOrderRemove = () => {
      // remove selected items in basket
      dispatch(ordersBasketRemove())
   }

   return (
      <Basket
         handleBasketItemChange={handleBasketItemChange}
         handleOrderBooking={handleOrderBooking}
         handleOrderRemove={handleOrderRemove}
         ordersBasket={basket}
      />
   )
}

export default BasketContainer
