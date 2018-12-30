import * as Ably from 'ably'
import { message } from 'antd'
import Service from './Service'

export default class AblyService extends Service {
  constructor(options) {
    super()
    this.service = new Ably.Realtime(options)
  }

  initConnectionEvents = () => {
    let connectingMessage

    this.addConnectionEvent('connecting', () => {
      if (!connectingMessage)
        connectingMessage = message.loading('Connecting to Ably...', 0)
    })

    this.addConnectionEvent('connected', () => {
      connectingMessage && connectingMessage()
      message.success('Connection is established')
    })

    this.addConnectionEvent('disconnected ', () => {
      message.warning('Ably is temporarily disconnected')
    })

    this.addConnectionEvent('suspended ', () => {
      message.error('Ably is disconnected!', 0)
    })
  }

  setChannel = name => {
    this.channel = this.service.channels.get(name)
  }

  subscribe = (eventName, callback) => {
    this.channel.subscribe(eventName, ({ data }) => callback(data))
  }

  unsubscribe = () => {
    this.channel.off()
    this.channel.unsubscribe()
  }

  addConnectionEvent = (eventName, callback) => {
    this.service.connection.on(eventName, callback)
  }

  removeConnectionEvent = (eventName, callback) => {
    this.service.connection.off(eventName, callback)
  }

  addChannelSuccessEvent = callback => {
    this.channel.on('attached', callback)
  }

  addChannelErrorEvent = callback => {
    this.channel.on(['suspended', 'failed'], callback)
  }

  publish = (eventName, data, callback) => {
    this.channel.publish(eventName, data, callback)
  }

  disconnect = () => {
    this.service.close()
  }
}
