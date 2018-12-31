import { Form, Input, Tooltip } from 'antd'
import * as PropTypes from 'prop-types'
import React from 'react'
import { formItemLayout } from '../layout'

export function CurrentChannelInput(props) {
  return (
    <Form.Item {...formItemLayout} label="Current Channel" help={props.help}>
      <Tooltip title={props.title} onVisibleChange={props.onVisibleChange}>
        <Input
          readOnly
          value={props.value}
          onClick={props.onClick}
          id="currentChannel"
        />
      </Tooltip>
    </Form.Item>
  )
}

CurrentChannelInput.propTypes = {
  help: PropTypes.string,
  title: PropTypes.string,
  onVisibleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
