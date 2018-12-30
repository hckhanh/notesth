import { fromJS } from 'immutable'
import { getDataSource, getNotesFromLocalStorage } from '../../utils'

const initState = getNotesFromLocalStorage('notes')

export default function(state = initState, action) {
  const dataSource = getDataSource()
  let { type: actionType, payload } = action

  if (/_BROADCAST$/.test(actionType)) {
    const [, eventAction] = actionType.match(/(\w+)_BROADCAST$/)
    dataSource.publish(eventAction, payload)
    if (dataSource.isGoAround()) {
      return state
    } else {
      actionType = eventAction
    }
  }

  switch (actionType) {
    case 'ADD_NOTE':
      return state.push(fromJS(payload))
    case 'DELETE_NOTE':
      const deletedIndex = state.findIndex(
        note => note.get('id') === payload.id
      )
      if (deletedIndex > -1) {
        return state.delete(deletedIndex)
      }
      return state
    case 'UPDATE_NOTE':
      const updatedIndex = state.findIndex(
        note => note.get('id') === payload.id
      )
      if (updatedIndex > -1) {
        return state.updateIn([updatedIndex, 'content'], () => payload.content)
      }
      return state
    case 'SAVE_NOTES':
      if (payload) {
        const { newNotes } = payload
        localStorage.setItem('notes', JSON.stringify(newNotes))
        return fromJS(newNotes)
      } else {
        const notesJS = state.toJS()
        localStorage.setItem('notes', JSON.stringify(notesJS))
      }
      return state
    default:
      return state
  }
}
