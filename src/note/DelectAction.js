import { Button, Popconfirm } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { deleteNote } from '../store/actions/note'
import { getDeleteNoteLoading } from '../store/selectors/note'

function DeleteAction({ deleteNote, noteId, deleteNoteLoading }) {
  return (
    <Popconfirm
      title="Are you sure?"
      onConfirm={() => deleteNote(noteId)}
      okText="Delete"
      cancelText="Cancel"
    >
      <Button
        htmlType="button"
        icon="delete"
        loading={
          deleteNoteLoading.get('status') === 'validating' &&
          deleteNoteLoading.getIn(['payload', 'id']) === noteId
        }
      />
    </Popconfirm>
  )
}

export default connect(
  state => ({
    deleteNoteLoading: getDeleteNoteLoading(state)
  }),
  { deleteNote }
)(DeleteAction)
