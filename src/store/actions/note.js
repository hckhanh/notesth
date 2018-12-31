import { generateId, getDataSource } from '../../utils'

export function addNote(content) {
  return function(dispatch) {
    dispatch({
      type: 'ADD_NOTE_BROADCAST',
      payload: { id: generateId(), content }
    })
    dispatch({ type: 'ADD_NOTE_VALIDATING' })
  }
}

export function deleteNote(id) {
  return function(dispatch) {
    dispatch({
      type: 'DELETE_NOTE_BROADCAST',
      payload: { id }
    })
    dispatch({ type: 'DELETE_NOTE_VALIDATING', payload: { id } })
  }
}

export function updateNote(note) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_NOTE_BROADCAST',
      payload: note
    })
    dispatch({ type: 'UPDATE_NOTE_VALIDATING', payload: { id: note.id } })
  }
}

export function initNoteEvents() {
  return function(dispatch) {
    const dataSource = getDataSource()

    dataSource.addChannelSuccessEvent(() => {
      dispatch({ type: 'CONNECT_CHANNEL_SUCCESS' })
    })

    dataSource.addChannelErrorEvent(() => {
      dispatch({ type: 'CONNECT_CHANNEL_ERROR' })
    })

    const noteActions = ['ADD_NOTE', 'DELETE_NOTE', 'UPDATE_NOTE']
    for (const action of noteActions) {
      dataSource.subscribe(action, (data) => {
        dispatch({
          type: action,
          payload: data
        })
        dispatch({ type: 'SAVE_NOTES' })
        dispatch({ type: `${action}_SUCCESS` })
      })
    }
  }
}
