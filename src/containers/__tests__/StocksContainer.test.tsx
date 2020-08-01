import React from 'react'
import { mount } from 'enzyme'
import { useHistory } from 'react-router-dom'

import { OrderAction } from 'types/orders-basket'
import Stocks from '../../components/Stocks'
import { getStocks } from '../../services/api/stocks'
import StocksContainer from '../StocksContainer'

jest.mock('../../services/api/stocks', () => ({
   getStocks: jest.fn(),
}))

const mockRouterHistoryReplace = jest.fn()
const mockDispatch = jest.fn()

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useHistory: jest.fn(),
}))

jest.mock('react-redux', () => ({
   ...jest.requireActual('react-redux'),
   useDispatch: () => mockDispatch,
}))
;(getStocks as jest.Mock).mockResolvedValue({
   data: [],
   pagination: {
      recordTotal: 0,
      limit: 0,
      offset: 0,
   },
})

const pageSize = 10

const setup = (pageNumber?: number) => {
   ;(useHistory as jest.Mock).mockImplementation(() => ({
      location: { state: { pageNumber } },
      replace: mockRouterHistoryReplace,
   }))
   const wrapper = mount(<StocksContainer pageSize={pageSize} />)
   return {
      wrapper,
   }
}

describe('StocksContainer component', () => {
   it('should call getStocks and replace router history with correct page number', async () => {
      let pageNumber = 1 // where 1 is the default page number
      const { wrapper } = setup()
      expect((getStocks as jest.Mock).mock.calls[0][0]).toEqual({
         limit: pageSize,
         offset: (pageNumber - 1) * pageSize,
      })

      pageNumber = 2 // simulate a change in page number
      wrapper.find(Stocks).props().handlePageNumberChange(pageNumber)
      await new Promise((resolve) => setTimeout(resolve, 0))
      expect((getStocks as jest.Mock).mock.calls[1][0]).toEqual({
         limit: pageSize,
         offset: (pageNumber - 1) * pageSize,
      })
      expect(mockRouterHistoryReplace.mock.calls[0][1]).toEqual({ pageNumber })
   })

   it('should call getStocks with page number in location state', async () => {
      const pageNumber = 3
      setup(pageNumber) // simulate component initialized with a location state
      expect((getStocks as jest.Mock).mock.calls[0][0]).toEqual({
         limit: pageSize,
         offset: (pageNumber - 1) * pageSize,
      })
   })

   it('should handle order add', async () => {
      const { wrapper } = setup()
      const stockCode = '123'
      const orderAction: OrderAction = 'Buy'
      wrapper.find(Stocks).props().handleOrderAdd(stockCode, orderAction)
      expect(mockDispatch.mock.calls[0][0]).toMatchObject({
         payload: {
            stockCode,
            orderAction,
         },
      })
   })
})
