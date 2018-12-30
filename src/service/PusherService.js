import { message } from 'antd'
import Pusher from 'pusher-js'
import { bugsnagClient } from '../bugsnag'
import Service from './Service'

// Enable pusher logging - don't include this in production
Pusher.logToConsole = process.env.NODE_ENV !== 'production'

export default class PusherService extends Service {
  constructor(options) {
    super()
    this.goAround = false
    this.service = new Pusher(process.env.REACT_APP_PUSHER_API_KEY, options)
  }

  initConnectionEvents = () => {
    let connectingMessage

    this.addConnectionEvent('connecting', () => {
      if (!connectingMessage)
        connectingMessage = message.loading('Connecting to Pusher...', 0)
    })

    this.addConnectionEvent('connected', () => {
      connectingMessage && connectingMessage()
      message.success('Connection is established')
    })

    this.addConnectionEvent('unavailable ', () => {
      message.error('Pusher is disconnected!', 0)
    })

    this.addConnectionEvent('failed ', () => {
      message.warning('Channels is not supported')
    })

    this.addConnectionEvent('connecting_in ', delay => {
      message.info(`Pusher will re-connect in ${delay} seconds`)
    })

    this.addConnectionEvent('error', ({ error }) => {
      message.error(
        `${error.type} ${error.data.code}: ${error.data.message}`,
        0
      )
    })
  }

  setChannel = name => {
    this.channelName = `private-${name}`
    this.channel = this.service.subscribe(this.channelName)
  }

  subscribe = (eventName, callback) => {
    this.channel.bind(`client-${eventName}`, callback)
  }

  unsubscribe = () => {
    this.service.unsubscribe(this.channelName)
  }

  addConnectionEvent = (eventName, callback) => {
    this.service.connection.bind(eventName, callback)
  }

  removeConnectionEvent = (eventName, callback) => {
    this.service.connection.unbind(eventName, callback)
  }

  addChannelSuccessEvent = callback => {
    this.channel.bind('pusher:subscription_succeeded', callback)
  }

  addChannelErrorEvent = callback => {
    this.channel.bind('pusher:subscription_error', callback)
  }

  publish = (eventName, data) => {
    this.channel.trigger(`client-${eventName}`, data)
  }

  disconnect = () => {
    this.service.disconnect()
  }
}
