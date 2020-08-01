import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { v4 as uuidV4 } from 'uuid'

import Stocks from 'components/Stocks'
import useApi from 'hooks/use-api'
import { getStocks } from 'services/api/stocks'
import { ordersBasketAdd } from 'services/store/orders-basket-actions'
import { ExecutionMode, OrderAction, OrderStatus } from 'types/orders-basket'

interface StocksProps {
   pageSize: number
}

const StocksContainer: React.FC<StocksProps> = ({ pageSize }) => {
   const [stocksApiResult, setStocksApiPayload] = useApi(getStocks)
   const [pageNumber, setPageNumber] = useState(0)

   const dispatch = useDispatch()
   const routerHistory = useHistory<{
      pageNumber: number
   }>()

   const handlePageNumberChange = (page: number) => {
      routerHistory.replace(
         routerHistory.location.pathname + routerHistory.location.search,
         {
            pageNumber: page,
         },
      )
      setPageNumber(page)
   }

   useEffect(() => {
      if (pageNumber === 0) {
         const historyPageNumber = routerHistory.location.state?.pageNumber
         if (historyPageNumber > 0) setPageNumber(historyPageNumber)
         else setPageNumber(1)
      } else {
         setStocksApiPayload({
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
         })
      }
   }, [pageNumber, pageSize])

   const handleOrderAdd = (stockCode: string, orderAction: OrderAction) => {
      const item = {
         stockCode,
         orderAction,
         uuid: uuidV4(),
         status: 'Not Ready' as OrderStatus,
         currency: 'HKD',
         executionMode: 'Limit' as ExecutionMode,
         selected: false,
      }
      dispatch(ordersBasketAdd(item))
   }

   return (
      <Stocks
         handleOrderAdd={handleOrderAdd}
         stockApiData={stocksApiResult.data}
         stockErrorMsg={stocksApiResult.error?.message}
         pageSize={pageSize}
         handlePageNumberChange={handlePageNumberChange}
      />
   )
}

export default StocksContainer
