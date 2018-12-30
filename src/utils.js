import { fromJS, List, Map } from 'immutable'
import uuid from 'uuid/v1'
import AblyService from './service/AblyService'
import serviceOptions from './service/options'
import PubNubService from './service/PubNubService'
import PusherService from './service/PusherService'

export function generateId() {
  return uuid()
}

export function getNotesFromLocalStorage(key) {
  const notesString = localStorage.getItem(key)
  if (notesString) {
    const notesJS = JSON.parse(notesString)
    if (notesJS.length > 0) {
      return fromJS(notesJS)
    }
  }
  return List()
}

let currentService = null
let currentServiceName = null

export function getDataSource(serviceName) {
  if (serviceName && currentServiceName !== serviceName) {
    const { options } = serviceOptions[serviceName]
    switch (serviceName) {
      case 'Ably':
        currentService = new AblyService(options)
        break
      case 'Pusher':
        currentService = new PusherService(options)
        break
      case 'PubNub':
        currentService = new PubNubService(options)
        break
      default:
        currentService = null
    }
    currentServiceName = serviceName
  }

  return currentService
}

const defaultLoadingState = Map({})
export const createLoadingSelector = (actionType, ignoreService) => state => {
  if (ignoreService || (currentService && currentService.isGoAround())) {
    return state.loading.get(actionType, defaultLoadingState)
  }
  return defaultLoadingState
}
