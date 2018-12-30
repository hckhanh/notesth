export function getServiceName(state) {
  return state.service.get('serviceName')
}

export function getChannelId(state) {
  return state.service.get('channelId')
}

export function getIsHost(state) {
  return state.service.get('isHost')
}
