import { Form } from 'antd'
import * as PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { formItemLayout } from '../layout'
import ConnectInput from './ConnectInput'

export default function ExternalChannelInput(props) {
  const inputRef = useRef(null)

  function handleSearch() {
    props.onSearch(inputRef.current.state.value)
  }

  return (
    <Form.Item
      {...formItemLayout}
      label="External Channel"
      validateStatus={props.channelField.status}
      help={props.channelField.error}
      hasFeedback
    >
      <ConnectInput
        ref={inputRef}
        onPressEnter={handleSearch}
        icon={props.icon}
        channelLoading={props.channelLoading}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
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
