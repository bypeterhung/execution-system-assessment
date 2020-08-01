import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

import css from './StockPagination.module.css'

const getMiddleItems = (
   pageNumber: number,
   totalPage: number,
   handlePageNumberChange: (pageNumber: number) => void,
) => {
   if (totalPage > 1) {
      let itemShift = pageNumber - 4 // case with there is Ellipsis on both side
      if (pageNumber < 7 || totalPage < 12) {
         // case with there is Ellipsis on right only or no Ellipsis at all
         itemShift = 2
      } else if (totalPage - pageNumber < 7) {
         // case with there is Ellipsis on left only
         itemShift = totalPage - 9
      }

      return Array(totalPage < 12 ? totalPage - 2 : 9)
         .fill(0)
         .map((_, i) => {
            const itemPage = i + itemShift
            return i === 0 && pageNumber > 6 && totalPage > 11 ? (
               <Pagination.Ellipsis
                  key={itemPage}
                  onClick={() =>
                     handlePageNumberChange(itemPage - 3 > 2 ? itemPage - 3 : 2)
                  }
               />
            ) : i === 8 && totalPage - pageNumber > 6 && totalPage > 11 ? (
               <Pagination.Ellipsis
                  key={itemPage}
                  onClick={() =>
                     handlePageNumberChange(
                        itemPage + 3 < totalPage - 1
                           ? itemPage + 3
                           : totalPage - 1,
                     )
                  }
               />
            ) : (
               <Pagination.Item
                  key={itemPage}
                  active={itemPage === pageNumber ? true : undefined}
                  onClick={() => handlePageNumberChange(itemPage)}
               >
                  {itemPage}
               </Pagination.Item>
            )
         })
   }
   return null
}

type StockPaginationProps = {
   pageNumber: number
   totalPage: number
   handlePageNumberChange: (pageNumber: number) => void
}

const StockPagination: React.FC<StockPaginationProps> = ({
   pageNumber,
   totalPage,
   handlePageNumberChange,
}) => {
   return totalPage === 0 ? null : (
      <Pagination className={css.pagination}>
         <Pagination.Prev
            disabled={pageNumber > 1 ? undefined : true}
            onClick={() => handlePageNumberChange(pageNumber - 1)}
         />
         <Pagination.Item
            onClick={() => handlePageNumberChange(1)}
            active={pageNumber === 1 ? true : undefined}
         >
            1
         </Pagination.Item>
         {getMiddleItems(pageNumber, totalPage, handlePageNumberChange)}
         {totalPage > 1 && (
            <Pagination.Item
               onClick={() => handlePageNumberChange(totalPage)}
               active={pageNumber === totalPage ? true : undefined}
            >
               {totalPage}
            </Pagination.Item>
         )}
         <Pagination.Next
            disabled={pageNumber < totalPage ? undefined : true}
            onClick={() => handlePageNumberChange(pageNumber + 1)}
         />
      </Pagination>
   )
}

export default StockPagination
