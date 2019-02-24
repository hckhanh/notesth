import { Form } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CurrentChannelInput from '../components/CurrentChannelInput'
import ExternalChannelInput from '../components/ExternalChannelInput'
import { initNoteEvents } from '../store/actions/note'
import { connectChannel, disconnectChannel } from '../store/actions/service'
import { getChannelLoading } from '../store/selectors/note'
import { getChannelId, getIsHost } from '../store/selectors/service'

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

  toggleConnectionRealtime = (channelId) => {
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

  getConnectButtonIcon = () => {
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

  clickToCopy = (e) => {
    e.target.select()
    document.execCommand('copy')
    this.setState({ clickToCopyText: 'Copied to clipboard' })
  }

  resetClickToCopyText = (visible) => {
    if (!visible) this.setState({ clickToCopyText: clickCopyText })
  }

  render() {
    return (
      <Form>
        <CurrentChannelInput
          help={this.state.channelHelpText}
          title={this.state.clickToCopyText}
          onVisibleChange={this.resetClickToCopyText}
          value={this.props.channelId}
          onClick={this.clickToCopy}
        />

        <ExternalChannelInput
          channelField={this.state.channelField}
          onSearch={this.toggleConnectionRealtime}
          icon={this.getConnectButtonIcon()}
          channelLoading={this.props.channelLoading}
          onMouseEnter={this.mouseEnterButton}
          onMouseLeave={this.mouseLeaveButton}
        />
      </Form>
    )
  }
}

export default connect(
  (state) => ({
    channelId: getChannelId(state),
    channelLoading: getChannelLoading(state),
    isHost: getIsHost(state)
  }),
  { connectChannel, initNoteEvents, disconnectChannel }
)(Connector)
