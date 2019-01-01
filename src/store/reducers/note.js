import { fromJS } from 'immutable'
import { getDataSource, getNotesFromLocalStorage } from '../../utils'

const initState = getNotesFromLocalStorage('notes')

function findNote(state, payload, callback) {
  const noteIndex = state.findIndex((note) => note.get('id') === payload.id)
  return noteIndex > -1 ? callback(noteIndex) : state
}

function saveNotesFromChannel(payload) {
  const { newNotes } = payload
  localStorage.setItem('notes', JSON.stringify(newNotes))
  return fromJS(newNotes)
}

function saveNotesFromLocal(state) {
  const notesJS = state.toJS()
  localStorage.setItem('notes', JSON.stringify(notesJS))
  return state
}

function broadcastEvent(actionType, dataSource, payload) {
  const [, eventAction] = actionType.match(/(\w+)_BROADCAST$/)
  dataSource.publish(eventAction, payload)
  return eventAction
}

function reduceLocalActions(state, actionType, payload) {
  switch (actionType) {
    case 'ADD_NOTE':
      return state.push(fromJS(payload))
    case 'DELETE_NOTE':
      return findNote(state, payload, (index) => state.delete(index))
    case 'UPDATE_NOTE':
      return findNote(state, payload, (index) =>
        state.updateIn([index, 'content'], () => payload.content)
      )
    case 'SAVE_NOTES':
      if (payload) {
        return saveNotesFromChannel(payload)
      }
      return saveNotesFromLocal(state)
    default:
      return state
  }
}

export default function(state = initState, { type: actionType, payload }) {
  const dataSource = getDataSource()

  if (/_BROADCAST$/.test(actionType)) {
    const eventAction = broadcastEvent(actionType, dataSource, payload)
    if (dataSource.isGoAround()) {
      return state
    }
    actionType = eventAction
  }

  return reduceLocalActions(state, actionType, payload)
}
