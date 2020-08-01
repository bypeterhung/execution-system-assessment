import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'

import { OrderAction, StockListItem } from 'types/orders-basket'

import css from './StockTable.module.css'

type StockTableProps = {
   stocks?: StockListItem[]
   handleOrderAdd: (stockCode: string, action: OrderAction) => void
   stockErrorMsg?: string
}

const StockTable: React.FC<StockTableProps> = ({
   stocks,
   handleOrderAdd,
   stockErrorMsg,
}) => {
   return (
      <>
         {stockErrorMsg !== undefined && (
            <Alert className={css.error} variant="danger">
               Error:
               {stockErrorMsg}
               <Button
                  data-test-id="error-retry-button"
                  onClick={window.location.reload}
                  variant="light"
               >
                  Retry
               </Button>
            </Alert>
         )}
         <Table striped className={css.table}>
            <thead>
               <tr>
                  <th>Stock Code</th>
                  <th>Market Price</th>
                  <th>Currency</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {stocks === undefined ? (
                  <tr>
                     <td colSpan={4} data-test-id="loading">
                        <div className="text-center">
                           <Spinner animation="border" variant="primary" />
                        </div>
                     </td>
                  </tr>
               ) : stocks.length === 0 ? (
                  <tr>
                     <td colSpan={4} data-test-id="no-record">
                        <div className="text-center">no stock record</div>
                     </td>
                  </tr>
               ) : (
                  stocks.map((stock) => (
                     <tr key={stock.stockCode}>
                        <td>{stock.stockCode}</td>
                        <td>{stock.marketPrice}</td>
                        <td>{stock.currency}</td>
                        <td>
                           <Button
                              onClick={() =>
                                 handleOrderAdd(stock.stockCode, 'Buy')
                              }
                           >
                              Buy
                           </Button>
                           <Button
                              onClick={() =>
                                 handleOrderAdd(stock.stockCode, 'Sell')
                              }
                              variant="dark"
                           >
                              Sell
                           </Button>
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </Table>
      </>
   )
}

export default StockTable
