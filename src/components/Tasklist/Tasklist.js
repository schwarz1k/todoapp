import TaskFunc from '../Task/Task'

import './Tasklist.css'

const Tasklist = ({ tasks, onDeleted, onToggleCompletion, onEdit, onSaveEdit }) => {
  const elements = tasks.map((task) => {
    return (
      <TaskFunc
        key={task.id}
        id={task.id}
        description={task.description}
        created={task.created}
        completed={task.completed}
        onDeleted={() => onDeleted(task.id)}
        onToggleCompletion={() => onToggleCompletion(task.id)}
        onEdit={onEdit}
        isEditing={task.isEditing}
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
