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

    dataSource.subscribe('ADD_NOTE', (note) => {
      dispatch({
        type: 'ADD_NOTE',
        payload: note
      })
      dispatch({ type: 'SAVE_NOTES' })
      dispatch({ type: 'ADD_NOTE_SUCCESS' })
    })

    dataSource.subscribe('DELETE_NOTE', (data) => {
      dispatch({
        type: 'DELETE_NOTE',
        payload: data
      })
      dispatch({ type: 'SAVE_NOTES' })
      dispatch({ type: 'DELETE_NOTE_SUCCESS' })
    })

    dataSource.subscribe('UPDATE_NOTE', (note) => {
      dispatch({
        type: 'UPDATE_NOTE',
        payload: note
      })
      dispatch({ type: 'SAVE_NOTES' })
      dispatch({ type: 'UPDATE_NOTE_SUCCESS' })
    })
  }
}
