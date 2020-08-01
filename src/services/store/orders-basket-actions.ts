import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { StoreRootState } from 'services/store/store-config'
import { OrdersBasketItem } from '../../types/orders-basket'
import { postOrder } from '../api/stocks'

export const ordersBasketBookActionTypes = {
   ORDERS_BASKET_ADD: 'ORDERS_BASKET_ADD' as const,
   ORDERS_BASKET_EDIT: 'ORDERS_BASKET_EDIT' as const,
   ORDERS_BASKET_BOOK_REQUEST: 'ORDERS_BASKET_BOOK_REQUEST' as const,
   ORDERS_BASKET_BOOK_RESPONSE: 'ORDERS_BASKET_BOOK_RESPONSE' as const,
   ORDERS_BASKET_REMOVE: 'ORDERS_BASKET_REMOVE' as const,
}

export type OrdersBasketActions =
   | ReturnType<typeof ordersBasketAdd>
   | ReturnType<typeof ordersBasketEdit>
   | ReturnType<typeof ordersBasketBookRequest>
   | ReturnType<typeof ordersBasketBookResponse>
   | ReturnType<typeof ordersBasketRemove>

type ThunkExtraArg = undefined
type OrderBasketThunkResult<R> = ThunkAction<
   R,
   StoreRootState,
   ThunkExtraArg,
   Action<string>
>

// type OrderBasketDispatch = ThunkDispatch<ThunkRootState, ThunkExtraArg, Action>

export const ordersBasketAdd = (payload: OrdersBasketItem) => ({
   type: ordersBasketBookActionTypes.ORDERS_BASKET_ADD,
   payload,
})

export const ordersBasketEdit = (payload: Partial<OrdersBasketItem>) => ({
   type: ordersBasketBookActionTypes.ORDERS_BASKET_EDIT,
   payload,
})

export const ordersBasketBook = (
   payload: OrdersBasketItem,
): OrderBasketThunkResult<
   Promise<ReturnType<typeof ordersBasketBookResponse>>
> => (dispatch, getState) => {
   dispatch(ordersBasketBookRequest(payload))
   return postOrder({ ...payload, selected: undefined })
      .then((order) => dispatch(ordersBasketBookResponse(order)))
      .catch((error) => {
         return dispatch(
            ordersBasketBookResponse({
               ...(getState().ordersBasket.find(
                  (item) => item.uuid === payload.uuid,
               ) as OrdersBasketItem),
               status: 'Rejected',
               error: error.message,
            }),
         )
      })
}

const ordersBasketBookRequest = (payload: OrdersBasketItem) => ({
   type: ordersBasketBookActionTypes.ORDERS_BASKET_BOOK_REQUEST,
   payload,
})

const ordersBasketBookResponse = (payload: OrdersBasketItem) => ({
   type: ordersBasketBookActionTypes.ORDERS_BASKET_BOOK_RESPONSE,
   payload,
})

export const ordersBasketRemove = () => ({
   type: ordersBasketBookActionTypes.ORDERS_BASKET_REMOVE,
})
