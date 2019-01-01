import { Map } from 'immutable'
import uuid from 'uuid/v1'
import { generateId, getDataSource } from '../../utils'

const initState = Map({
  serviceName: 'Ably',
  channelId: uuid(),
  isHost: true
})

function switchChannel(dataSource, channelId, state, isHost) {
  dataSource.unsubscribe()
  dataSource.setChannel(channelId)
  return state
    .update('channelId', () => channelId)
    .update('isHost', () => isHost)
}

function switchService(payload, state) {
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
}

export default function(state = initState, action) {
  const { payload } = action
  const dataSource = getDataSource()

  switch (action.type) {
    case 'SWITCH_SERVICE':
      return switchService(payload, state)
    case 'CONNECT_CHANNEL':
      return switchChannel(dataSource, payload.channelId, state, false)
    case 'DISCONNECT_CHANNEL':
      const newChannelId = generateId()
      return switchChannel(dataSource, newChannelId, state, true)
    default:
      return state
  }
}
