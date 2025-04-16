import './Footer.css'

import TasksFilter from '../Tasksfilter/TasksFilter'

const Footer = ({ counterTasks, setFilterValue, filterValue, clearAllTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{counterTasks()} items left</span>
      <TasksFilter setFilterValue={setFilterValue} filterValue={filterValue} />
      <button className="clear-completed" onClick={clearAllTasks}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
