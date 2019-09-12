import { Form, Input, List } from 'antd'
import * as PropTypes from 'prop-types'
import React, { Component, forwardRef } from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../../store/actions/note'
import { getUpdateLoading } from '../../store/selectors/note'
import DeleteAction from '../DelectAction'
import TextContent from '../TextContent'
import './style.css'

const ContentInput = forwardRef(
  ({ updateLoading, note, onPressEnter }, ref) => (
    <Form style={{ width: 462 }}>
      <Form.Item
        hasFeedback={updateLoading.get('status') !== 'success'}
        validateStatus={updateLoading.get('status')}
        style={{ margin: 0 }}
      >
        <Input
          ref={ref}
          id="noteEditorContent"
          defaultValue={note.get('content')}
          placeholder="Enter external id to connect"
          onPressEnter={onPressEnter}
        />
      </Form.Item>
    </Form>
  )
)

ContentInput.propTypes = {
  updateLoading: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  onPressEnter: PropTypes.func
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

  clickOutside = (e) => {
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
        <span ref={this.wrapper} className="note-item">
          {!this.state.editing ? (
            <TextContent onClick={this.toggleEdit} note={note} />
          ) : (
            <ContentInput
              updateLoading={this.props.updateLoading}
              ref={this.input}
              note={note}
              onPressEnter={this.saveNote}
            />
          )}
        </span>
      </List.Item>
    )
  }
}

export default connect(
  (state) => ({ updateLoading: getUpdateLoading(state) }),
  { updateNote }
)(EditableNote)
