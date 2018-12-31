import { Layout } from 'antd'
import React from 'react'

export function Footer() {
  return (
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
  )
}
