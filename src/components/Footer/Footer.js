import './Footer.css'
import { Component } from 'react'

import Tasksfilter from '../Tasksfilter/Tasksfilter'

export default class Footer extends Component {
  render() {
    const { counterTasks, setFilterValue, filterValue, clearAllTasks } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{counterTasks()} items left</span>
        <Tasksfilter setFilterValue={setFilterValue} filterValue={filterValue} />
        <button className="clear-completed" onClick={clearAllTasks}>
          Clear completed
        </button>
      </footer>
    )
  }
}
