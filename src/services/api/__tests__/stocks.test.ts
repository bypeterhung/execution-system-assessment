import mockOrdersBasketItem from '../../../__mocks__/mockOrdersBasketItem'
import { getStocks, postOrder } from '../stocks'

describe('stocks api', () => {
   it('should return api result when get stocks', async () => {
      const mockData = [1, 2, 3]
      const spy = jest.spyOn(window, 'fetch').mockResolvedValue({
         ok: true,
         json: () => new Promise((resolve) => resolve(mockData)),
      } as Response)
      const result = await getStocks({ offset: 0, limit: 10 })
      expect(spy.mock.calls[0][0]).toMatch(/^http.+\/stocks\?limit=10&offset=0/)
      expect(result).toBe(mockData)
   })

   it('should return api result post order', async () => {
      const spy = jest.spyOn(window, 'fetch').mockResolvedValue({
         ok: true,
         json: () => new Promise((resolve) => resolve(mockOrdersBasketItem)),
      } as Response)
      const result = await postOrder(mockOrdersBasketItem)
      expect(spy.mock.calls[0][0]).toMatch(/^http.+\/orders$/)
      expect(result).toBe(mockOrdersBasketItem)
   })

   it('should handle error when post order', async () => {
      const error = 'test error'
      const spy = jest.spyOn(window, 'fetch').mockResolvedValue({
         ok: false,
         statusText: error,
      } as Response)
      const result = await postOrder(mockOrdersBasketItem)
      expect(spy.mock.calls[0][0]).toMatch(/^http.+\/orders$/)
      expect(result.error).toBe(error)
   })

   it('should handle error when post order', async () => {
      const error = 'test error'
      const spy = jest.spyOn(window, 'fetch').mockRejectedValue({
         message: error,
      })
      const result = await postOrder(mockOrdersBasketItem)
      expect(spy.mock.calls[0][0]).toMatch(/^http.+\/orders$/)
      expect(result.error.message).toBe(error)
   })
})
