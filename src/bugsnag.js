import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'
import React from 'react'

export const bugsnagClient = bugsnag({
  apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
  appVersion: process.env.REACT_APP_VERSION,
  notifyReleaseStages: ['production']
})
bugsnagClient.use(bugsnagReact, React)

// wrap your entire app tree in the ErrorBoundary provided
const ErrorBoundary = bugsnagClient.getPlugin('react')

export default ErrorBoundary
