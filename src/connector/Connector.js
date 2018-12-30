import { Button, Form, Input, Tooltip } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initNoteEvents } from '../store/actions/note'
import { connectChannel, disconnectChannel } from '../store/actions/service'
import { getChannelLoading } from '../store/selectors/note'
import { getChannelId, getIsHost } from '../store/selectors/service'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

const channelHelpText =
  'Use this id to connect to this session from other devices'

const clickCopyText = 'Click to copy'

class Connector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      channelField: {
        status: null,
        error: null
      },
      channelHelpText: channelHelpText,
      mouseHoverButton: false,
      clickToCopyText: clickCopyText
    }
  }

  toggleConnectionRealtime = channelId => {
    if (!this.props.isHost) {
      this.props.disconnectChannel()
      return this.props.initNoteEvents()
    }

    if (channelId === '') {
      this.setState({
        channelField: {
          status: 'error',
          error: 'Channel ID cannot be empty'
        }
      })
    } else {
      this.setState({
        channelHelpText: null,
        channelField: { status: null }
      })
      this.props.connectChannel(channelId)
      this.props.initNoteEvents()
    }
  }

  mouseEnterButton = () => {
    this.setState({ mouseHoverButton: true })
  }

  mouseLeaveButton = () => {
    this.setState({ mouseHoverButton: false })
  }

  generateConnectButtonText = () => {
    const status = this.props.channelLoading.get('status')
    if (!this.props.isHost && status === 'success') {
      if (this.state.mouseHoverButton) {
        return 'Disconnect'
      } else {
        return 'Connected'
      }
    } else {
      return 'Connect'
    }
  }

  generateConnectButtonIcon = () => {
    const status = this.props.channelLoading.get('status')
    if (!this.props.isHost && status === 'success') {
      if (this.state.mouseHoverButton) {
        return 'disconnect'
      } else {
        return 'check'
      }
    } else {
      return 'caret-right'
    }
  }

  clickToCopy = e => {
    e.target.select()
    document.execCommand('copy')
    this.setState({ clickToCopyText: 'Copied to clipboard' })
  }

  resetClickToCopyText = visible => {
    if (!visible) this.setState({ clickToCopyText: clickCopyText })
  }

  render() {
    return (
      <Form>
        <Form.Item
          {...formItemLayout}
          label="Current Channel"
          help={this.state.channelHelpText}
        >
          <Tooltip
            title={this.state.clickToCopyText}
            onVisibleChange={this.resetClickToCopyText}
          >
            <Input
              readOnly
              value={this.props.channelId}
              onClick={this.clickToCopy}
              id="currentChannel"
            />
          </Tooltip>
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="External Channel"
          hasFeedback
          validateStatus={this.state.channelField.status}
          help={this.state.channelField.error}
        >
          <Input.Search
            placeholder="Enter channel id from other device to connect"
            onSearch={this.toggleConnectionRealtime}
            enterButton={
              <Button
                htmlType="button"
                icon={this.generateConnectButtonIcon()}
                loading={
                  this.props.channelLoading.get('status') === 'validating'
                }
                onMouseEnter={this.mouseEnterButton}
                onMouseLeave={this.mouseLeaveButton}
              >
                {this.generateConnectButtonText()}
              </Button>
            }
          />
        </Form.Item>
      </Form>
    )
  }
}

export default connect(
  state => ({
    channelId: getChannelId(state),
    channelLoading: getChannelLoading(state),
    isHost: getIsHost(state)
  }),
  {
    connectChannel,
    initNoteEvents,
    disconnectChannel
  }
)(Connector)
