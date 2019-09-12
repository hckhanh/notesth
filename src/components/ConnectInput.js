import { Button, Col, Input, Row } from 'antd'
import * as PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

function ConnectInput(props, inputRef) {
  return (
    <Row gutter={8} type="flex" align="middle">
      <Col span={22}>
        <Input
          ref={inputRef}
          placeholder="Enter channel id from other device to connect"
          onPressEnter={props.onPressEnter}
        />
      </Col>
      <Col span={2}>
        <Button
          icon={props.icon}
          loading={props.channelLoading.get('status') === 'validating'}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          onClick={props.onPressEnter}
        />
      </Col>
    </Row>
  )
}

ConnectInput.propTypes = {
  ref: PropTypes.any,
  onPressEnter: PropTypes.func,
  icon: PropTypes.string,
  channelLoading: PropTypes.any,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

export default forwardRef(ConnectInput)
