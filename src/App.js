import { Breadcrumb, Layout, Menu } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Connector from './connector/Connector'
import NoteInput from './note/NoteInput'
import NoteList from './note/NoteList'
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
        <Layout.Header className="app-layout-header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
            onSelect={this.switchServiceKey}
            selectedKeys={[serviceName]}
          >
            <Menu.Item key="Ably">Ably</Menu.Item>
            <Menu.Item key="Pusher">Pusher</Menu.Item>
            <Menu.Item key="PubNub">PubNub</Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content className="app-layout-content">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Service</Breadcrumb.Item>
            <Breadcrumb.Item>{serviceName}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="main-content-layout">
            <div className="main-content">
              <Connector />
              <NoteList />
              <NoteInput />
            </div>
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          NoteSth ©2018 Created by{' '}
          <a
            href="https://github.com/hckhanh"
            target="_blank"
            rel="noopener noreferrer"
          >
            Khanh Hoang
          </a>
        </Layout.Footer>
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
