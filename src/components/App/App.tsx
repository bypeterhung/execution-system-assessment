import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'

import BasketContainer from '../../containers/BasketContainer'
import StocksContainer from '../../containers/StocksContainer'
import { setupStore } from '../../services/store/store-config'
import AppRoute from './AppRoute'
import ErrorBoundary from './ErrorBoundary'

import css from './App.module.css'

function App() {
   return (
      <div className={css.app}>
         <ErrorBoundary>
            <Provider
               store={setupStore({
                  ordersBasket: [],
               })}
            >
               <Router>
                  <Switch>
                     <AppRoute exact path="/">
                        <Redirect to="/stocks" />
                     </AppRoute>
                     <AppRoute exact path="/basket">
                        <BasketContainer />
                     </AppRoute>
                     <AppRoute exact path="/stocks">
                        <StocksContainer pageSize={12} />
                     </AppRoute>
                  </Switch>
               </Router>
            </Provider>
         </ErrorBoundary>
      </div>
   )
}

export default App
