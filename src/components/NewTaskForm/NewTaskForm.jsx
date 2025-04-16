import PropTypes from 'prop-types'
import { useState } from 'react'

import './NewTaskForm.css'

const NewTaskForm = ({ addItem }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (event) => {
    setLabel(event.target.value)
  }

  const onMinutesChange = (event) => {
    setMinutes(event.target.value)
  }

  const onSecondsChange = (event) => {
    setSeconds(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (!label.trim()) {
      alert('Описание задачи не может быть пустым!')
      return
    }

    if (!minutes && !seconds) {
      alert('Пожалуйста, укажите минуты или секунды для таймера!')
      return
    }

    addItem(label, minutes, seconds)

    setLabel('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          type="text"
          onChange={onLabelChange}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          autoFocus={false}
          onChange={onMinutesChange}
          value={minutes}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          autoFocus={false}
          onChange={onSecondsChange}
          value={seconds}
        />
        <button type="submit" style={{ display: 'none' }}>
          Submit
        </button>
      </form>
    </header>
  )
}

export default NewTaskForm

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}
