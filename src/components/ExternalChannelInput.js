import { Button, Col, Form, Input, Row } from 'antd'
import * as PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { formItemLayout } from '../layout'

export default function ExternalChannelInput(props) {
  const inputRef = useRef(null)

  function handleSearch() {
    props.onSearch(inputRef.current.state.value)
  }

  return (
    <Form.Item
      {...formItemLayout}
      label="External Channel"
      hasFeedback
      validateStatus={props.channelField.status}
      help={props.channelField.error}
    >
      <Row gutter={8} type="flex" align="middle">
        <Col span={22}>
          <Input
            ref={inputRef}
            placeholder="Enter channel id from other device to connect"
            onPressEnter={handleSearch}
          />
        </Col>
        <Col span={2}>
          <Button
            htmlType="button"
            icon={props.icon}
            loading={props.channelLoading.get('status') === 'validating'}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={handleSearch}
          />
        </Col>
      </Row>
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
