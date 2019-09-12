function callNotImplemented() {
  throw new Error('This function is not implemented!')
}

export default class Service {
  constructor() {
    this.goAround = true
  }

  isGoAround() {
    return this.goAround
  }

  initConnectionEvents() {
    callNotImplemented()
  }

  setChannel(name) {
    callNotImplemented()
  }

  subscribe(eventName, callback) {
    callNotImplemented()
  }

  unsubscribe() {
    callNotImplemented()
  }

  addConnectionEvent(eventName, callback) {
    callNotImplemented()
  }

  removeConnectionEvent(eventName, callback) {
    callNotImplemented()
  }

  addChannelSuccessEvent(eventName, callback) {
    callNotImplemented()
  }

  addChannelErrorEvent(eventName, callback) {
    callNotImplemented()
  }

  publish(eventName, data, callback) {
    callNotImplemented()
  }

  disconnect() {
    callNotImplemented()
  }
}
