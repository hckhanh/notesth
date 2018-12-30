import services from '../../service/options'

export function switchService(serviceKey) {
  if (services.hasOwnProperty(serviceKey)) {
    return {
      type: 'SWITCH_SERVICE',
      payload: {
        serviceName: serviceKey
      }
    }
  } else {
    console.warn(`Service has key ${serviceKey} is not available`)
  }
}

export function connectChannel(channelId) {
  return function(dispatch) {
    dispatch({
      type: 'CONNECT_CHANNEL',
      payload: { channelId }
    })
    dispatch({ type: 'CONNECT_CHANNEL_VALIDATING' })
  }
}

export function disconnectChannel() {
  return { type: 'DISCONNECT_CHANNEL' }
}
