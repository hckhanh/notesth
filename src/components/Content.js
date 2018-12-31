import { Breadcrumb, Layout } from 'antd'
import * as PropTypes from 'prop-types'
import React from 'react'
import Connector from '../connector/Connector'
import NoteInput from '../note/NoteInput'
import NoteList from '../note/NoteList'

export function Content(props) {
  return (
    <Layout.Content className="app-layout-content">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Service</Breadcrumb.Item>
        <Breadcrumb.Item>{props.serviceName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-content-layout">
        <div className="main-content">
          <Connector />
          <NoteList />
          <NoteInput />
        </div>
      </div>
    </Layout.Content>
  )
}

Content.propTypes = { serviceName: PropTypes.string.isRequired }
