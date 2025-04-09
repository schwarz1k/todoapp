import PropTypes from 'prop-types'
import { Component } from 'react'

import './Newtaskform.css'

export default class Newtaskform extends Component {
  state = { label: '', minutes: '', seconds: '' }

  onLabelChange = (event) => {
    this.setState({ label: event.target.value })
  }

  onMinutesChange = (event) => {
    this.setState({ minutes: event.target.value })
  }

  onSecondsChange = (event) => {
    this.setState({ seconds: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()

    const { label, minutes, seconds } = this.state

    if (!label.trim()) {
      alert('Описание задачи не может быть пустым!')
      return
    }

    this.props.addItem(label, minutes, seconds)

    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
            type="text"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            autoFocus={false}
            onChange={this.onMinutesChange}
            value={this.state.minutes}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            autoFocus={false}
            onChange={this.onSecondsChange}
            value={this.state.seconds}
          />
          <button type="submit" style={{ display: 'none' }}>
            Submit
          </button>
        </form>
      </header>
    )
  }
}

Newtaskform.propTypes = {
  addItem: PropTypes.func.isRequired,
}
