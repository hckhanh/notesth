import { Button, Form, Input } from 'antd'
import * as PropTypes from 'prop-types'
import React from 'react'
import { formItemLayout } from '../layout'

export default function ExternalChannelInput(props) {
  return (
    <Form.Item
      {...formItemLayout}
      label="External Channel"
      hasFeedback
      validateStatus={props.channelField.status}
      help={props.channelField.error}
    >
      <Input.Search
        placeholder="Enter channel id from other device to connect"
        onSearch={props.onSearch}
        enterButton={
          <Button
            htmlType="button"
            icon={props.icon}
            loading={props.channelLoading.get('status') === 'validating'}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
          />
        }
      />
    </Form.Item>
  )
}

ExternalChannelInput.propTypes = {
  channelField: PropTypes.exact({
    status: PropTypes.oneOf(['validating', 'success', 'warning', 'error']),
    error: PropTypes.string
  }),
  onSearch: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  channelLoading: PropTypes.object,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
}
