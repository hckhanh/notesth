import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import ErrorBoundary from './bugsnag'
import * as serviceWorker from './serviceWorker'
import createConfigStore from './store'

ReactDOM.render(
  <ErrorBoundary>
    <ConfigProvider>
      <Provider store={createConfigStore()}>
        <App />
      </Provider>
    </ConfigProvider>
  </ErrorBoundary>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
