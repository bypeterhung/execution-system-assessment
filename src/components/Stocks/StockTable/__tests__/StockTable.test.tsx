import React from 'react'
import { shallow } from 'enzyme'
import { Alert, Button } from 'react-bootstrap'

import { StockListItem } from 'types/orders-basket'
import StockTable from '../StockTable'

const mockStocks = [
   { stockCode: '1 HK', marketPrice: 164.34, currency: 'HKD' },
   { stockCode: '2 HK', marketPrice: 363.53, currency: 'HKD' },
   { stockCode: '3 HK', marketPrice: 59.98, currency: 'HKD' },
   { stockCode: '4 HK', marketPrice: 159.41, currency: 'HKD' },
   { stockCode: '5 HK', marketPrice: 295.64, currency: 'HKD' },
   { stockCode: '6 HK', marketPrice: 426.39, currency: 'HKD' },
   { stockCode: '7 HK', marketPrice: 250.07, currency: 'HKD' },
   { stockCode: '8 HK', marketPrice: 116.87, currency: 'HKD' },
   { stockCode: '9 HK', marketPrice: 293.54, currency: 'HKD' },
   { stockCode: '10 HK', marketPrice: 250.94, currency: 'HKD' },
   { stockCode: '11 HK', marketPrice: 62.26, currency: 'HKD' },
   { stockCode: '12 HK', marketPrice: 248.5, currency: 'HKD' },
]

const setup = (stocks?: StockListItem[], stockError?: string) => {
   const handleOrderAdd = jest.fn()
   const wrapper = shallow(
      <StockTable
         stocks={stocks}
         handleOrderAdd={handleOrderAdd}
         stockErrorMsg={stockError}
      />,
   )
   return {
      wrapper,
      handleOrderAdd,
   }
}

describe('StockTable component', () => {
   it('should render stocks', () => {
      const { wrapper } = setup(mockStocks)
      expect(wrapper.find('tr').length).toBe(mockStocks.length + 1) // +1 for header row
   })

   it('should handle buy and sell order click', () => {
      const { wrapper, handleOrderAdd } = setup(mockStocks)
      wrapper
         .find(Button)
         .filterWhere((n) => n.text() === 'Buy')
         .at(0)
         .props()
         .onClick()
      expect(handleOrderAdd.mock.calls[0][1]).toBe('Buy')
      wrapper
         .find(Button)
         .filterWhere((n) => n.text() === 'Sell')
         .at(0)
         .props()
         .onClick()
      expect(handleOrderAdd.mock.calls[1][1]).toBe('Sell')
   })

   it('should return null when stocks is undefined', () => {
      const { wrapper } = setup()
      expect(wrapper.find('[data-test-id="loading"]').length).toBe(1)
   })

   it('should show no records when stocks has no item', () => {
      const { wrapper } = setup([])
      expect(wrapper.find('[data-test-id="no-record"]').length).toBe(1)
   })

   it('should show error', () => {
      const error = 'test error'
      const { wrapper } = setup([], error)
      expect(wrapper.find(Alert).text()).toContain(error)
   })
})
