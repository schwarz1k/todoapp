import Task from '../Task/Task'
import './Tasklist.css'

const Tasklist = ({ tasks, onDeleted, onToggleCompletion, onEdit, onSaveEdit, startTimer, pauseTimer }) => {
  const elements = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        description={task.description}
        created={task.created}
        completed={task.completed}
        isEditing={task.isEditing}
        timeInSeconds={task.timeInSeconds}
        timerRunning={task.timerRunning}
        startTimer={() => startTimer(task.id)}
        pauseTimer={() => pauseTimer(task.id)}
        onDeleted={() => onDeleted(task.id)}
        onToggleCompletion={() => onToggleCompletion(task.id)}
        onEdit={() => onEdit(task.id)}
        onSaveEdit={onSaveEdit}
      />
    )
  })

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  )
}

export default Tasklist
