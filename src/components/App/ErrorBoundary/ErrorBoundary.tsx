import React, { Component, ErrorInfo } from 'react'
import Button from 'react-bootstrap/Button'

import css from './ErrorBoundary.module.css'

class ErrorBoundary extends Component {
   public state = {
      hasError: false,
   }

   public static getDerivedStateFromError() {
      return { hasError: true }
   }

   public componentDidCatch(error: Error, info: ErrorInfo) {
      console.error('Error caught by ErrorBoundary', error, info)
   }

   handleRefreshClick = () => {
      window.location.reload()
   }

   render() {
      return this.state.hasError ? (
         <p className={css['error-content']} data-test-id="error-content">
            An unexpected error occurred, please{' '}
            <Button onClick={this.handleRefreshClick} variant="link">
               refresh
            </Button>{' '}
            and try again.
         </p>
      ) : (
         this.props.children
      )
   }
}

export default ErrorBoundary
