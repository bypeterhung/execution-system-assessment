import React from 'react'
import { useRouteMatch } from 'react-router'

import Header from 'components/App/Header'
import useTypedSelector from 'hooks/use-typed-selector'

const HeaderContainer: React.FC = () => {
   const basketCount = useTypedSelector((state) => {
      return state.ordersBasket.length
   })
   const routeMatch = useRouteMatch()
   return <Header activeLink={routeMatch.path} basketCount={basketCount} />
}

export default HeaderContainer
