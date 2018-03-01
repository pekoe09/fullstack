import React from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({ comment, handleChange, handleComment }) => {
  return (
    <div>
        <input
          name='comment'
          value={comment}
          onChange={handleChange}
        />
        <button onClick={handleComment}>add comment</button>
    </div>
  )
}

export default CommentForm

CommentForm.propTypes = {
  comment: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleComment: PropTypes.func.isRequired
}