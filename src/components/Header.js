import { Layout, Menu } from 'antd'
import * as PropTypes from 'prop-types'
import React from 'react'

export default function Header({ serviceName, onSelect }) {
  return (
    <Layout.Header className="app-layout-header">
      <div className="logo" />
      <a
        className="app-version"
        href="https://github.com/hckhanh/notesth"
        target="_blank"
        rel="noopener noreferrer"
      >
        v{process.env.REACT_APP_VERSION}
      </a>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
        onSelect={onSelect}
        selectedKeys={[serviceName]}
      >
        <Menu.Item key="Ably">Ably</Menu.Item>
        <Menu.Item key="Pusher">Pusher</Menu.Item>
        <Menu.Item key="PubNub">PubNub</Menu.Item>
      </Menu>
    </Layout.Header>
  )
}

Header.propTypes = {
  serviceName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}
