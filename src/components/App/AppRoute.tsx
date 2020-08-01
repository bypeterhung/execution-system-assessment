import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

import HeaderContainer from '../../containers/HeaderContainer'

const AppRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
   return (
      <Route {...rest}>
         <main>
            <HeaderContainer />
            {children}
         </main>
      </Route>
   )
}

export default AppRoute
