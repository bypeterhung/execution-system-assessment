import mockOrdersBasketItem from '__mocks__/mockOrdersBasketItem'

import { OrdersBasketItem } from 'types/orders-basket'
import ordersBasket from '../orders-basket'

const mockUuid = 'test-3b7d-4bad-9bdd-2b0d7b3dcb6d'

describe('orders-basket reducer', () => {
   it('should add item to basket', async () => {
      expect(
         ordersBasket(undefined, {
            type: 'ORDERS_BASKET_ADD',
            payload: mockOrdersBasketItem,
         }),
      ).toEqual([mockOrdersBasketItem])
   })

   it('should handle item edit', () => {
      const item: Partial<OrdersBasketItem> = {
         ...mockOrdersBasketItem,
         uuid: mockUuid,
         status: 'Not Ready',
         selected: false,
         executionMode: 'Market',
         orderPrice: undefined,
         currency: 'HKD',
         shares: 100,
         stockCode: '5432 HK',
      }
      const editItem: Partial<OrdersBasketItem> = {
         ...item,
         uuid: mockUuid,
         selected: true,
         executionMode: 'Limit',
         orderPrice: '12.34',
         currency: 'USD',
         shares: 300,
      }

      expect(
         ordersBasket([item as OrdersBasketItem, mockOrdersBasketItem], {
            type: 'ORDERS_BASKET_EDIT',
            payload: editItem,
         }),
      ).toEqual([{ ...editItem, status: 'Ready' }, mockOrdersBasketItem])
   })

   it('should mark as Not Ready where shares is 0', () => {
      const item = {
         ...mockOrdersBasketItem,
         uuid: mockUuid,
         status: 'Ready',
         shares: 300,
         stockCode: '5432 HK',
      } as OrdersBasketItem
      const editItem = {
         ...item,
         shares: 0,
      }
      expect(
         ordersBasket([item, mockOrdersBasketItem], {
            type: 'ORDERS_BASKET_EDIT',
            payload: editItem,
         }),
      ).toEqual([{ ...editItem, status: 'Not Ready' }, mockOrdersBasketItem])
   })

   it('should handle item edit where mode is Limit and price is undefined', () => {
      const item = {
         ...mockOrdersBasketItem,
         uuid: mockUuid,
         status: 'Booked',
         selected: true,
         stockCode: '5432 HK',
      } as OrdersBasketItem
      const editItem = {
         ...item,
         selected: false,
      }
      expect(
         ordersBasket([item, mockOrdersBasketItem], {
            type: 'ORDERS_BASKET_EDIT',
            payload: editItem,
         }),
      ).toEqual([{ ...editItem }, mockOrdersBasketItem])
   })

   it('should handle item edit', () => {
      const item = {
         ...mockOrdersBasketItem,
         uuid: mockUuid,
         status: 'Ready',
         orderPrice: '300',
         stockCode: '5432 HK',
      } as OrdersBasketItem
      const editItem = {
         ...item,
         executionMode: 'Limit' as const,
         orderPrice: undefined,
      }
      expect(
         ordersBasket([item, mockOrdersBasketItem], {
            type: 'ORDERS_BASKET_EDIT',
            payload: editItem,
         }),
      ).toEqual([{ ...editItem, status: 'Not Ready' }, mockOrdersBasketItem])
   })

   it('should handle item edit where mode is Limit and currency is undefined', () => {
      const item = {
         ...mockOrdersBasketItem,
         uuid: mockUuid,
         status: 'Ready',
         currency: 'HKD',
         stockCode: '5432 HK',
      } as OrdersBasketItem
      const editItem = {
         ...item,
         executionMode: 'Limit' as const,
         currency: undefined,
      }
      expect(
         ordersBasket([item, mockOrdersBasketItem], {
            type: 'ORDERS_BASKET_EDIT',
            payload: editItem,
         }),
      ).toEqual([{ ...editItem, status: 'Not Ready' }, mockOrdersBasketItem])
   })

   it('should remove selected item from basket', () => {
      const remainingItem = {
         ...mockOrdersBasketItem,
         uuid: mockUuid,
         stockCode: '123 HK',
         selected: false,
      }
      expect(
         ordersBasket(
            [
               remainingItem,
               { ...mockOrdersBasketItem, stockCode: '456 HK', selected: true },
            ],
            {
               type: 'ORDERS_BASKET_REMOVE',
            },
         ),
      ).toEqual([remainingItem])
   })

   it('should update status to In Progress for book request', () => {
      const item = {
         ...mockOrdersBasketItem,
         uuid: mockUuid,
         status: 'Ready',
         stockCode: '5432 HK',
      } as OrdersBasketItem
      expect(
         ordersBasket([item, mockOrdersBasketItem], {
            type: 'ORDERS_BASKET_BOOK_REQUEST',
            payload: item,
         }),
      ).toEqual([{ ...item, status: 'In Progress' }, mockOrdersBasketItem])
   })

   it('should update item values from book response', () => {
      const item = {
         ...mockOrdersBasketItem,
         uuid: mockUuid,
         status: 'In Progress',
         orderPrice: undefined,
         executionMode: 'Market',
      } as OrdersBasketItem
      const orderPrice = '123.45'
      expect(
         ordersBasket([item, mockOrdersBasketItem], {
            type: 'ORDERS_BASKET_BOOK_RESPONSE',
            payload: { ...item, orderPrice },
         })[0].orderPrice,
      ).toEqual(orderPrice)
   })

   test('should set default state and return original state when action type is not matched', () => {
      // no get around for type error in order to cover switch default case
      // @ts-ignore
      expect(ordersBasket(undefined, { type: 'mock action' })).toEqual([])
   })
})
