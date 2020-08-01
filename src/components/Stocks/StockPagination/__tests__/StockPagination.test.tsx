import React from 'react'
import { shallow } from 'enzyme'
import Pagination from 'react-bootstrap/Pagination'

import StockPagination from '../StockPagination'

const setup = (pageNumber: number, totalPage: number) => {
   const handlePageNumberChange = jest.fn()
   const wrapper = shallow(
      <StockPagination
         totalPage={totalPage}
         pageNumber={pageNumber}
         handlePageNumberChange={handlePageNumberChange}
      />,
   )
   return {
      wrapper,
      handlePageNumberChange,
   }
}

describe('StockPagination component', () => {
   it('should render page number buttons and no Ellipsis button when totalPage > 1 and < 12', () => {
      const totalPage = 10
      const { wrapper } = setup(1, totalPage)
      expect(wrapper.find(Pagination.Ellipsis).length).toBe(0)
      expect(wrapper.find(Pagination.Item).length).toBe(totalPage)
   })

   it('should render page number buttons and the right Ellipsis button when pageNumber < 7 and totalPage > 11', () => {
      const { wrapper } = setup(5, 15)
      expect((wrapper.childAt(10).getElement().type as any).displayName).toBe(
         'Ellipsis',
      )
      expect((wrapper.childAt(0).getElement().type as any).displayName).toBe(
         'Prev',
      )
      expect((wrapper.childAt(12).getElement().type as any).displayName).toBe(
         'Next',
      )
      expect(wrapper.find(Pagination.Item).length).toBe(10)
      expect(wrapper.children().length).toBe(13)
   })

   it(
      'should render page number buttons and the left Ellipsis button when ' +
         'totalPage - pageNumber < 7 and totalPage > 11',
      () => {
         const { wrapper } = setup(10, 15)
         expect((wrapper.childAt(2).getElement().type as any).displayName).toBe(
            'Ellipsis',
         )
         expect((wrapper.childAt(0).getElement().type as any).displayName).toBe(
            'Prev',
         )
         expect(
            (wrapper.childAt(12).getElement().type as any).displayName,
         ).toBe('Next')
         expect(wrapper.find(Pagination.Item).length).toBe(10)
         expect(wrapper.children().length).toBe(13)
      },
   )

   it(
      'should render page number buttons and both the left and right Ellipsis buttons when ' +
         'pageNumber > 6 and totalPage - pageNumber > 6 and totalPage > 11',
      () => {
         const { wrapper } = setup(8, 15)
         expect((wrapper.childAt(2).getElement().type as any).displayName).toBe(
            'Ellipsis',
         )
         expect(
            (wrapper.childAt(10).getElement().type as any).displayName,
         ).toBe('Ellipsis')
         expect((wrapper.childAt(0).getElement().type as any).displayName).toBe(
            'Prev',
         )
         expect(
            (wrapper.childAt(12).getElement().type as any).displayName,
         ).toBe('Next')
         expect(wrapper.find(Pagination.Item).length).toBe(9)
         expect(wrapper.children().length).toBe(13)
      },
   )

   it('should render only one page number button when totalPage = 1', () => {
      const { wrapper } = setup(1, 1)
      expect((wrapper.childAt(0).getElement().type as any).displayName).toBe(
         'Prev',
      )
      expect((wrapper.childAt(2).getElement().type as any).displayName).toBe(
         'Next',
      )
      expect(wrapper.find(Pagination.Item).length).toBe(1)
      expect(wrapper.children().length).toBe(3)
   })

   it('should return null when totalPage = 0', () => {
      const { wrapper } = setup(0, 0)
      expect(wrapper.children().length).toBe(0)
   })

   it('should handle page number change for prev, next, first and last button', () => {
      const pageNumber = 8
      const totalPage = 15
      const { wrapper, handlePageNumberChange } = setup(pageNumber, totalPage)
      wrapper.find(Pagination.Prev).props().onClick()
      expect(handlePageNumberChange.mock.calls[0][0]).toBe(pageNumber - 1)
      wrapper.find(Pagination.Next).props().onClick()
      expect(handlePageNumberChange.mock.calls[1][0]).toBe(pageNumber + 1)
      wrapper.find(Pagination.Item).at(0).props().onClick()
      expect(handlePageNumberChange.mock.calls[2][0]).toBe(1)
      wrapper.find(Pagination.Item).last().props().onClick()
      expect(handlePageNumberChange.mock.calls[3][0]).toBe(totalPage)
   })

   it('should handle page number change for ellipsis and number button', () => {
      const { wrapper, handlePageNumberChange } = setup(15, 30)
      wrapper.find(Pagination.Ellipsis).at(0).props().onClick()
      expect(handlePageNumberChange.mock.calls[0][0]).toBe(8)
      wrapper.find(Pagination.Ellipsis).at(1).props().onClick()
      expect(handlePageNumberChange.mock.calls[1][0]).toBe(22)
      wrapper.find(Pagination.Item).at(1).props().onClick()
      expect(handlePageNumberChange.mock.calls[2][0]).toBe(12)
   })

   it('should handle page number change for ellipsis button with values > 1 and < totalPage', () => {
      const { wrapper, handlePageNumberChange } = setup(8, 15)
      wrapper.find(Pagination.Ellipsis).at(0).props().onClick()
      expect(handlePageNumberChange.mock.calls[0][0]).toBe(2)
      wrapper.find(Pagination.Ellipsis).at(1).props().onClick()
      expect(handlePageNumberChange.mock.calls[1][0]).toBe(14)
   })

   it('should set active attribute of number button', () => {
      const { wrapper } = setup(15, 15)
      expect(wrapper.find(Pagination.Item).last().props().active).toBe(true)
   })
})
