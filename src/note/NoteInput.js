import { Form, Input } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNote } from '../store/actions/note'
import { getAddNoteLoading } from '../store/selectors/note'
import './EditableNote.css'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

class NoteInput extends Component {
  addNote = e => {
    const value = e.target.value
    if (value) {
      this.props.addNote(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    return (
      <Form>
        <Form.Item
          hasFeedback
          validateStatus={this.props.addNoteLoading.get('status')}
        >
          <Input
            ref={node => (this.note = node)}
            placeholder="Enter some note..."
            onPressEnter={this.addNote}
            readOnly={this.props.addNoteLoading.get('status') === 'validating'}
            id="noteContent"
          />
        </Form.Item>
      </Form>
    )
  }
}

export default connect(
  state => ({
    addNoteLoading: getAddNoteLoading(state)
  }),
  { addNote }
)(NoteInput)
