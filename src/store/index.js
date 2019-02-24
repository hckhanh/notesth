import LogRocket from 'logrocket'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

export default function createConfigStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk, LogRocket.reduxMiddleware()))
  )
}
