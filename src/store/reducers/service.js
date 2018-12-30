import { Map } from 'immutable'
import uuid from 'uuid/v1'
import { generateId, getDataSource } from '../../utils'

const initState = Map({
  serviceName: 'Ably',
  channelId: uuid(),
  isHost: true
})

export default function(state = initState, action) {
  const { payload } = action
  const dataSource = getDataSource()

  switch (action.type) {
    case 'SWITCH_SERVICE':
      const { serviceName } = payload
      if (serviceName) {
        const oldDataSource = getDataSource()
        if (oldDataSource) {
          oldDataSource.disconnect()
        }
        const dataSource = getDataSource(serviceName)
        dataSource.setChannel(state.get('channelId'))
        dataSource.initConnectionEvents()
        return state.update('serviceName', () => serviceName)
      }
      return state
    case 'CONNECT_CHANNEL':
      dataSource.unsubscribe()
      dataSource.setChannel(payload.channelId)
      return state
        .update('channelId', () => payload.channelId)
        .update('isHost', () => false)
    case 'DISCONNECT_CHANNEL':
      const newChannelId = generateId()
      dataSource.unsubscribe()
      dataSource.setChannel(newChannelId)
      return state
        .update('channelId', () => newChannelId)
        .update('isHost', () => true)
    default:
      return state
  }
}
