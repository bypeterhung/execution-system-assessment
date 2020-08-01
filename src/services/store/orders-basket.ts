import {
    OrdersBasketActions, ordersBasketBookActionTypes
} from 'services/store/orders-basket-actions'
import { OrdersBasketItem, OrderStatus } from 'types/orders-basket'

export default function ordersBasket(
   state: OrdersBasketItem[] = [],
   action: OrdersBasketActions,
): OrdersBasketItem[] {
   let status: OrderStatus
   switch (action.type) {
      case ordersBasketBookActionTypes.ORDERS_BASKET_ADD:
         return [action.payload, ...state]
      case ordersBasketBookActionTypes.ORDERS_BASKET_EDIT:
         // toggle Ready / Not Ready status base on item properties
         if (
            // include all the cases where status should be Ready
            (action.payload.status === 'Ready' ||
               action.payload.status === 'Not Ready') &&
            action.payload.stockCode &&
            action.payload.orderAction &&
            (action.payload.shares || 0) > 0 &&
            (action.payload.executionMode === 'Market' ||
               (parseFloat(action.payload.orderPrice || '0') > 0 &&
                  (action.payload.currency || '').length > 0))
         ) {
            status = 'Ready'
         } else if (action.payload.status === 'Ready') {
            // include all the cases where status should be Not Ready after the above if clause
            status = 'Not Ready'
         }
         return [
            ...state.map((item) => {
               if (item.uuid === action.payload.uuid) {
                  return {
                     ...item,
                     ...action.payload,
                     status: status || item.status,
                  }
               }
               return item
            }),
         ]
      case ordersBasketBookActionTypes.ORDERS_BASKET_BOOK_REQUEST:
         return [
            ...state.map((item) => {
               if (item.uuid === action.payload.uuid) {
                  return {
                     ...action.payload,
                     selected: false,
                     status: 'In Progress',
                  } as OrdersBasketItem
               }
               return item
            }),
         ]
      case ordersBasketBookActionTypes.ORDERS_BASKET_BOOK_RESPONSE:
         return [
            ...state.map((item) => {
               if (item.uuid === action.payload.uuid) {
                  return { ...item, ...action.payload }
               }
               return item
            }),
         ]
      case ordersBasketBookActionTypes.ORDERS_BASKET_REMOVE:
         return [...state.filter((item) => !item.selected)]
      default:
         return state
   }
}
