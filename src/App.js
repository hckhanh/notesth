import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'
import { initNoteEvents } from './store/actions/note'
import { switchService } from './store/actions/service'
import { getServiceName } from './store/selectors/service'

function App({ serviceName, switchService, initNoteEvents }) {
  const switchServiceEvents = useCallback((serviceKey) => {
    switchService(serviceKey)
    initNoteEvents()
  })

  useEffect(() => {
    switchServiceEvents(serviceName)
  }, [serviceName, switchServiceEvents])

  return (
    <Layout className="app-layout">
      <Header
        serviceName={serviceName}
        onSelect={({ key }) => switchServiceEvents(key)}
      />
      <Content serviceName={serviceName} />
      <Footer />
    </Layout>
  )
}

export default connect((state) => ({ serviceName: getServiceName(state) }), {
  switchService,
  initNoteEvents
})(App)
