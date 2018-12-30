import { createLoadingSelector } from '../../utils'

export function getNotes(state) {
  return state.note
}

export const getAddNoteLoading = createLoadingSelector('ADD_NOTE')
export const getUpdateLoading = createLoadingSelector('UPDATE_NOTE')
export const getChannelLoading = createLoadingSelector('CONNECT_CHANNEL', true)
export const getDeleteNoteLoading = createLoadingSelector('DELETE_NOTE')
