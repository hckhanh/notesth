import { Layout } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { initNoteEvents } from './store/actions/note'
import { switchService } from './store/actions/service'
import { getServiceName } from './store/selectors/service'

class App extends Component {
  switchServiceKey = ({ key }) => {
    this.switchServiceEvents(key)
  }

  componentDidMount() {
    this.switchServiceEvents(this.props.serviceName)
  }

  switchServiceEvents = (serviceKey) => {
    const { switchService, initNoteEvents } = this.props
    switchService(serviceKey)
    initNoteEvents()
  }

  render() {
    const { serviceName } = this.props
    return (
      <Layout className="app-layout">
        <Header onSelect={this.switchServiceKey} serviceName={serviceName} />
        <Content serviceName={serviceName} />
        <Footer />
      </Layout>
    )
  }
}

export default connect(
  (state) => ({
    serviceName: getServiceName(state)
  }),
  { switchService, initNoteEvents }
)(App)
