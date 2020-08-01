import mockOrdersBasketItem from '../../../__mocks__/mockOrdersBasketItem'
import { postOrder } from '../../api/stocks'
import {
    ordersBasketAdd, ordersBasketBook, ordersBasketBookActionTypes, ordersBasketEdit,
    ordersBasketRemove
} from '../orders-basket-actions'
import { setupStore } from '../store-config'

jest.mock('../../api/stocks', () => ({
   postOrder: jest.fn().mockResolvedValue({
      ...mockOrdersBasketItem,
      orderPrice: 123.45,
      status: 'Booked',
   }),
}))

describe('orders-basket action', () => {
   it('should call api and update store for booking', async () => {
      const appStore = setupStore({
         ordersBasket: [{ ...mockOrdersBasketItem, status: 'Ready' }],
      })
      await appStore.dispatch(
         ordersBasketBook(appStore.getState().ordersBasket[0]),
      )
      // new Promise((resolve) => setTimeout(resolve, 0))
      expect(appStore.getState().ordersBasket[0].status).toBe('Booked')
   })

   it('should handle api error and update store for booking', async () => {
      const error = 'test error'
      ;(postOrder as jest.Mock).mockRejectedValue({
         message: error,
      })
      const appStore = setupStore({
         ordersBasket: [{ ...mockOrdersBasketItem, status: 'Ready' }],
      })
      await appStore.dispatch(
         ordersBasketBook(appStore.getState().ordersBasket[0]),
      )
      expect(appStore.getState().ordersBasket[0].status).toBe('Rejected')
      expect(appStore.getState().ordersBasket[0].error).toBe(error)
   })

   it('should handle add item', () => {
      expect(ordersBasketAdd(mockOrdersBasketItem)).toEqual({
         type: ordersBasketBookActionTypes.ORDERS_BASKET_ADD,
         payload: mockOrdersBasketItem,
      })
   })

   it('should handle edit item', () => {
      expect(ordersBasketEdit(mockOrdersBasketItem)).toEqual({
         type: ordersBasketBookActionTypes.ORDERS_BASKET_EDIT,
         payload: mockOrdersBasketItem,
      })
   })

   it('should handle remove items', () => {
      expect(ordersBasketRemove()).toEqual({
         type: ordersBasketBookActionTypes.ORDERS_BASKET_REMOVE,
      })
   })
})
