import { message } from 'antd'
import PubNub from 'pubnub/lib/web'
import { bugsnagClient } from '../bugsnag'
import Service from './Service'

export default class PubNubService extends Service {
  constructor(options) {
    super()
    this.service = new PubNub(options)
    this.channelEvents = {}
    this.connectionEvents = {}
  }

  initConnectionEvents = () => {
    this.service.addListener({
      message: (m) => {
        const { eventName, data } = m.message
        if (this.channelEvents.hasOwnProperty(eventName)) {
          this.channelEvents[eventName](data)
        }
      },
      status: (s) => {
        if (this.connectionEvents.hasOwnProperty(s.category)) {
          this.connectionEvents[s.category](s)
        } else if (s.error) {
          message.error(`Error: ${s.category}`, 0)
          bugsnagClient.notify(s, { metaData: { service: { name: 'PubNub' } } })
        }
      }
    })

    this.addConnectionEvent('PNReconnectedCategory', () => {
      message.success('Connection is established')
    })

    this.addConnectionEvent('PNNetworkDownCategory ', () => {
      message.error('PubNub is disconnected!', 0)
    })

    message.success('Connection is established')
  }

  setChannel = (name) => {
    this.channelName = name
    this.service.subscribe({ channels: [name] })
  }

  subscribe = (eventName, callback) => {
    this.channelEvents[eventName] = callback
  }

  unsubscribe = () => {
    this.service.unsubscribe({ channels: [this.channelName] })
  }

  addConnectionEvent = (eventName, callback) => {
    this.connectionEvents[eventName] = callback
  }

  removeConnectionEvent = (eventName, callback) => {
    delete this.connectionEvents[eventName]
  }

  addChannelSuccessEvent = (callback) => {
    this.addConnectionEvent('PNConnectedCategory', callback)
  }

  addChannelErrorEvent = (callback) => {}

  publish = (eventName, data) => {
    this.service.publish(
      { message: { eventName, data }, channel: this.channelName },
      function(status, response) {
        // handle status, response
        console.log(status, response)
      }
    )
  }

  disconnect = () => {
    this.service.disconnect()
  }
}
