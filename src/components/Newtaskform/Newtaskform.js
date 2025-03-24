import PropTypes from 'prop-types'
import { Component } from 'react'
import './Newtaskform.css'

export default class Newtaskform extends Component {
  state = { label: '' }

  onLabelChange = (event) => {
    this.setState({ label: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.addItem(this.state.label)
    this.setState({ label: '' })
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-from" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
            type="text"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      </header>
    )
  }
}

Newtaskform.propTypes = {
  addItem: PropTypes.func.isRequired,
}
