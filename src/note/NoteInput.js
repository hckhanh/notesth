import { Form, Input } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { addNote } from '../store/actions/note'
import { getAddNoteLoading } from '../store/selectors/note'
import './EditableNote.css'

function NoteInput({ addNote, addNoteLoading }) {
  const handleAddNote = (e) => {
    const value = e.target.value
    if (value) {
      addNote(value)
      e.target.value = ''
    }
  }

  return (
    <Form>
      <Form.Item
        hasFeedback={addNoteLoading.get('status') !== 'success'}
        validateStatus={addNoteLoading.get('status')}
      >
        <Input
          id="noteContent"
          placeholder="Write some note..."
          readOnly={addNoteLoading.get('loading')}
          onPressEnter={handleAddNote}
        />
      </Form.Item>
    </Form>
  )
}

export default connect(
  (state) => ({ addNoteLoading: getAddNoteLoading(state) }),
  { addNote }
)(NoteInput)
