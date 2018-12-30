import { List } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { getNotes } from '../store/selectors/note'
import EditableNote from './EditableNote'

function NoteList({ notes }) {
  return (
    <List
      header={
        <b>
          These notes are stored in Local Storage and shared across multiple
          sessions
        </b>
      }
      bordered
      dataSource={notes}
      renderItem={note => <EditableNote note={note} />}
    />
  )
}

export default connect(state => ({
  notes: getNotes(state)
}))(NoteList)
