import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import ordersBasket from './orders-basket'
import { OrdersBasketActions } from './orders-basket-actions'
import testState from './test-state'
import { TestStateActions } from './test-state-actions'

const storeReducers = combineReducers({ ordersBasket, testState })
export type StoreRootState = ReturnType<typeof storeReducers>

type storeActions = OrdersBasketActions | TestStateActions

export const setupStore = (initStoreState: Partial<StoreRootState>) => {
   return createStore(
      storeReducers,
      initStoreState,
      composeWithDevTools(
         applyMiddleware(
            thunk as ThunkMiddleware<StoreRootState, storeActions>,
         ),
      ),
   )
}
