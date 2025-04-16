import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import React, { useEffect, useState } from 'react'
import './Task.css'

const Task = ({
  id,
  description,
  created,
  completed,
  onDeleted,
  onToggleCompletion,
  onEdit,
  onSaveEdit,
  isEditing,
  timeInSeconds,
  timerRunning,
  startTimer,
  pauseTimer,
}) => {
  const [editText, setEditText] = useState(description)

  const handleChange = (event) => {
    setEditText(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSaveEdit(id, editText)
    } else if (event.key === 'Escape') {
      setEditText(description)
      onEdit(id)
    }
  }

  useEffect(() => {
    setEditText(description)
  }, [description])

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  let classNames = 'todo-list-item'
  if (completed) classNames += ' completed'
  if (isEditing) classNames += ' visible'

  return (
    <li className={classNames}>
      <div className="view">
        <input type="checkbox" id={id} className="toggle" checked={completed} onChange={() => onToggleCompletion(id)} />
        <label htmlFor={id}>
          <span className="title">{description}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => startTimer(id)} disabled={timerRunning}></button>
            <button className="icon icon-pause" onClick={() => pauseTimer(id)} disabled={!timerRunning}></button>
            <span>{formatTime(timeInSeconds)}</span>
          </span>
          <span className="created">создано {formatDistanceToNow(created, { addSuffix: true })}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEdit(id)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </li>
  )
}

export default Task

Task.defaultProps = {
  completed: false,
  isEditing: false,
  timeInSeconds: 0,
  timerRunning: false,
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  completed: PropTypes.bool,
  isEditing: PropTypes.bool,
  timeInSeconds: PropTypes.number.isRequired,
  timerRunning: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
}
