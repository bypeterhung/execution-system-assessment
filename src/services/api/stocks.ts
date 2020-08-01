import { OrdersBasketItem } from 'types/orders-basket'

export const API_ROOT = 'http://localhost:3300'

export const getStocks: (payload: {
   offset: number
   limit: number
}) => Promise<any> = ({ offset, limit }) =>
   fetch(
      `${API_ROOT}/stocks?limit=${limit}&offset=${offset}`,
   ).then((response) => response.json())

export const postOrder = (order: Partial<OrdersBasketItem>) => {
   return fetch(`${API_ROOT}/orders`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
   })
      .then((response) => {
         if (!response.ok) {
            return { ...order, error: response.statusText, status: 'Error' }
         }
         return response.json()
      })
      .catch((error) => {
         return { ...order, error, status: 'Error' }
      })
}
