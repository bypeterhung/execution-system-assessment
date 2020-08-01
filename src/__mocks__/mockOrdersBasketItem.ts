import { OrdersBasketItem } from 'types/orders-basket'

const ordersBasketItem: Partial<OrdersBasketItem> = {
   selected: false,
   status: 'Ready',
   orderAction: 'Buy',
   stockCode: '1 HK',
   executionMode: 'Limit',
   orderPrice: '123.45',
   currency: 'HKD',
   shares: 100,
   error: undefined,
   uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
}

const mockOrdersBasketItem = ordersBasketItem as OrdersBasketItem
export default mockOrdersBasketItem
