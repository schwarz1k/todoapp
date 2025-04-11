import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'
import './Task.css'

export default class Task extends Component {
  state = {
    editText: this.props.description,
  }

  handleChange = (event) => {
    this.setState({ editText: event.target.value })
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.onSaveEdit(this.props.id, this.state.editText)
    } else if (event.key === 'Escape') {
      this.setState({ editText: this.props.description })
      this.props.onEdit(this.props.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.description !== this.props.description) {
      this.setState({ editText: this.props.description })
    }
  }

  formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  render() {
    const {
      id,
      description,
      created,
      completed,
      onDeleted,
      onToggleCompletion,
      onEdit,
      isEditing,
      timeInSeconds,
      timerRunning,
      startTimer,
      pauseTimer,
    } = this.props

    let classNames = 'todo-list-item'
    if (completed) classNames += ' completed'
    if (isEditing) classNames += ' visible'

    return (
      <li className={classNames}>
        <div className="view">
          <input
            type="checkbox"
            id={id}
            className="toggle"
            checked={completed}
            onChange={() => onToggleCompletion(id)}
          />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" onClick={startTimer} disabled={timerRunning}></button>
              <button className="icon icon-pause" onClick={pauseTimer} disabled={!timerRunning}></button>
              <span>{this.formatTime(timeInSeconds)}</span>
            </span>
            <span className="created">создано {formatDistanceToNow(created, { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={() => onEdit(id)}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
          <input
            type="text"
            className="edit"
            value={this.state.editText}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            autoFocus
          />
        </div>
      </li>
    )
  }
}

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
