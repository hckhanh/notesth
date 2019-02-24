import * as PropTypes from 'prop-types'
import React, { memo } from 'react'

function TextContent({ note, onClick }) {
  return (
    <span className="editable-content" onClick={onClick}>
      {note.get('content')}
    </span>
  )
}

TextContent.propTypes = {
  note: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default memo(TextContent)
