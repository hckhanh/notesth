import { Form, Input, List } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../store/actions/note'
import { getUpdateLoading } from '../store/selectors/note'
import DeleteAction from './DelectAction'
import './EditableNote.css'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

class EditableNote extends Component {
  state = {
    editing: false
  }

  constructor(props) {
    super(props)
    this.wrapper = React.createRef()
    this.input = React.createRef()
  }

  toggleEdit = () => {
    this.setState(
      ({ editing }) => {
        if (!editing) {
          document.addEventListener('click', this.clickOutside, true)
          return { editing: true }
        }
      },
      () => this.input.current.focus()
    )
  }

  clickOutside = e => {
    if (
      this.state.editing &&
      e.target !== this.wrapper.current &&
      !this.wrapper.current.contains(e.target)
    ) {
      document.removeEventListener('click', this.clickOutside, true)
      this.saveNote()
    }
  }

  saveNote = () => {
    const content = this.input.current.input.value
    const { note, updateNote } = this.props
    if (note.get('content') !== content) {
      updateNote({ id: note.get('id'), content })
    }
    this.setState({ editing: false })
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside, true)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (!this.props.note.equals(nextProps.note)) {
      return true
    }

    if (
      nextProps.updateLoading.getIn(['payload', 'id']) ===
      this.props.note.get('id')
    ) {
      if (
        /^(validating|success)$/.test(nextProps.updateLoading.get('status'))
      ) {
        return true
      }
    }

    if (this.state.editing !== nextState.editing) {
      return this.props.updateLoading.get('status') !== 'validating'
    }

    return false
  }

  render() {
    const note = this.props.note
    return (
      <List.Item
        className="editable-note"
        actions={[<DeleteAction noteId={note.get('id')} />]}
      >
        <span ref={this.wrapper}>
          {!this.state.editing ? (
            <span onClick={this.toggleEdit}>{note.get('content')}</span>
          ) : (
            <Form>
              <Form.Item
                hasFeedback
                validateStatus={this.props.updateLoading.get('status')}
              >
                <Input
                  ref={this.input}
                  placeholder="Enter external id to connect"
                  defaultValue={note.get('content')}
                  onPressEnter={this.saveNote}
                  id="noteEditorContent"
                />
              </Form.Item>
            </Form>
          )}
        </span>
      </List.Item>
    )
  }
}

export default connect(
  state => ({
    updateLoading: getUpdateLoading(state)
  }),
  { updateNote }
)(EditableNote)
