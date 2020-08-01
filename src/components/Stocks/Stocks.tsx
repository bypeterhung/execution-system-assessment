import React from 'react'

import { OrderAction, StockListItem } from 'types/orders-basket'
import StockPagination from './StockPagination'
import StockTable from './StockTable'

import appCss from '../App/App.module.css'

export type StocksProps = {
   handleOrderAdd: (stockCode: string, orderAction: OrderAction) => void
   stockApiData?: {
      data: StockListItem[]
      pagination: {
         recordTotal: number
         limit: number
         offset: number
      }
   }
   stockErrorMsg?: string
   handlePageNumberChange: (page: number) => void
   pageSize: number
}

const Stocks: React.FC<StocksProps> = ({
   handlePageNumberChange,
   pageSize,
   stockErrorMsg,
   stockApiData,
   handleOrderAdd,
}) => {
   return (
      <div className={appCss['content-zoom-in']}>
         <StockTable
            stockErrorMsg={stockErrorMsg}
            stocks={stockApiData?.data}
            handleOrderAdd={handleOrderAdd}
         />
         <StockPagination
            handlePageNumberChange={handlePageNumberChange}
            pageNumber={
               stockApiData
                  ? Math.ceil(stockApiData.pagination.offset / pageSize) + 1
                  : 0
            }
            totalPage={
               stockApiData
                  ? Math.ceil(stockApiData.pagination.recordTotal / pageSize)
                  : 0
            }
         />
      </div>
   )
}

export default Stocks
