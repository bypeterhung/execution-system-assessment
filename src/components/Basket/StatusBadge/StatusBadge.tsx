import React from 'react'

import { OrderStatus } from 'types/orders-basket'

type StatusLabelProps = {
   status: OrderStatus
}

const badgeCss = {
   'Not Ready': 'warning',
   Ready: 'primary',
   'In Progress': 'info',
   Booked: 'success',
   Rejected: 'danger',
   Error: 'danger',
}

const StatusBadge: React.FC<StatusLabelProps> = ({ status }) => {
   return <span className={`badge badge-${badgeCss[status]}`}>{status}</span>
}

export default StatusBadge
