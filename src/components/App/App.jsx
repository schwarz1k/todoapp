import { useState, useRef } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filterValue, setFilterValue] = useState('all')
  const timersRef = useRef({})

  const addItem = (text, minutes, seconds) => {
    const totalSeconds = (Number(minutes) || 0) * 60 + (Number(seconds) || 0)

    const newItem = {
      id: Math.random().toString(36).slice(2),
      description: text,
      timeInSeconds: totalSeconds,
      created: new Date(),
      completed: false,
      isEditing: false,
      timerRunning: false,
      timerId: null,
    }

    setTasks((prevTasks) => {
      return [...prevTasks, newItem]
    })
  }

  const deleteItem = (id) => {
    if (timersRef.current[id]) {
      clearInterval(timersRef.current[id])
      delete timersRef.current[id]
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const onEdit = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, isEditing: !task.isEditing }
        }
        return task
      })
    })
  }

  const saveEdit = (id, newText) => {
    if (!newText.trim()) {
      alert('Описание задачи не может быть пустым!')
      return
    }
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, description: newText, isEditing: false }
        }
        return task
      })
    })
  }

  const toggleCompletion = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed
          if (newCompleted) {
            if (task.timerId) {
              clearInterval(task.timerId)
            }
            return {
              ...task,
              completed: true,
              timerRunning: false,
              timerId: null,
              timeInSeconds: 0,
            }
          }
          return { ...task, completed: false }
        }
        return task
      })
    })
  }

  const counterTasks = () => {
    return tasks.filter((task) => !task.completed).length
  }

  const changeFilter = (filter) => {
    setFilterValue(filter)
  }

  const clearAllTasks = () => {
    Object.values(timersRef.current).forEach(clearInterval)
    timersRef.current = {}
    setTasks([])
  }

  const filteredTasks = () => {
    if (filterValue === 'active') {
      return tasks.filter((task) => !task.completed)
    }
    if (filterValue === 'completed') {
      return tasks.filter((task) => task.completed)
    }
    return tasks
  }

  const startTimer = (id) => {
    if (timersRef.current[id]) return

    const timerId = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id !== id) return task

          if (task.timeInSeconds <= 1) {
            clearInterval(timersRef.current[id])
            delete timersRef.current[id]
            return { ...task, timeInSeconds: 0, timerRunning: false }
          }

          return { ...task, timeInSeconds: task.timeInSeconds - 1 }
        })
      )
    }, 1000)

    timersRef.current[id] = timerId

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, timerRunning: true } : task)))
  }

  const pauseTimer = (id) => {
    if (timersRef.current[id]) {
      clearInterval(timersRef.current[id])
      delete timersRef.current[id]
    }

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, timerRunning: false } : task)))
  }

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        tasks={filteredTasks()}
        onDeleted={deleteItem}
        onToggleCompletion={toggleCompletion}
        onEdit={onEdit}
        onSaveEdit={saveEdit}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
      />
      <Footer
        counterTasks={counterTasks}
        setFilterValue={changeFilter}
        filterValue={filterValue}
        clearAllTasks={clearAllTasks}
      />
    </section>
  )
}

export default App
