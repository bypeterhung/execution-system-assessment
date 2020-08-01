export type OrdersBasketItem = {
   uuid: string
   selected: boolean
   status: OrderStatus
   orderAction: OrderAction
   stockCode: string
   executionMode?: ExecutionMode
   orderPrice?: string
   currency?: string
   shares?: number
   error?: string
}

export type ExecutionMode = 'Market' | 'Limit'

export type OrderStatus =
   | 'Not Ready'
   | 'Ready'
   | 'In Progress'
   | 'Booked'
   | 'Rejected'
   | 'Error'

export type OrderAction = 'Buy' | 'Sell'

export type StockListItem = {
   stockCode: string
   marketPrice: number
   currency: string
}

export type OrderBasketEditProps = {
   ordersBasketItem: OrdersBasketItem
   handleBasketItemChange: (item: Partial<OrdersBasketItem>) => void
}
