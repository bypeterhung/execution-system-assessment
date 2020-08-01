import React from 'react'
import { shallow } from 'enzyme'

import StockPagination from '../StockPagination'
import Stocks, { StocksProps } from '../Stocks'
import StockTable from '../StockTable'

const setup = (stockApiData?: StocksProps['stockApiData']) => {
   return shallow(
      <Stocks
         handlePageNumberChange={() => {}}
         handleOrderAdd={() => {}}
         pageSize={10}
         stockApiData={stockApiData}
      />,
   )
}

describe('Stocks component', () => {
   it('should render StockTable and StockPagination', async () => {
      const wrapper = setup()
      expect(wrapper.find(StockTable).length).toBe(1)
      expect(wrapper.find(StockPagination).length).toBe(1)
   })

   it('should pass page number', async () => {
      const wrapper = setup({
         data: [],
         pagination: {
            recordTotal: 30,
            limit: 10,
            offset: 10,
         },
      })
      expect(wrapper.find(StockPagination).props().pageNumber).toBe(2)
   })
})
