import { Component } from 'react'

import Newtaskform from '../Newtaskform/Newtaskform'
import Tasklist from '../Tasklist/Tasklist'
import Footer from '../Footer/Footer'

import './App.css'

export default class App extends Component {
  state = {
    tasks: [],
    filterValue: 'all',
  }

  addItem = (text, minutes, seconds) => {
    const newItem = {
      id: Math.random().toString(36).slice(2),
      description: text,
      minutes: minutes ? Number(minutes) : 60,
      seconds: seconds ? Number(seconds) : 0,
      created: new Date(),
      completed: false,
      isEditing: false,
      timerRunning: false,
      timerId: null,
    }

    this.setState(({ tasks }) => {
      const newArr = [...tasks, newItem]
      return { tasks: newArr }
    })
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((el) => el.id === id)
      if (index === -1) return { tasks }

      const targetTask = tasks[index]
      if (targetTask.timerId) {
        clearInterval(targetTask.timerId)
      }
      const newArr = [...tasks.slice(0, index), ...tasks.slice(index + 1)]
      return { tasks: newArr }
    })
  }

  onEdit = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isEditing: !task.isEditing }
        }
        return task
      })
      return { tasks: newTasks }
    })
  }

  saveEdit = (id, newText) => {
    if (!newText.trim()) {
      alert('Описание задачи не может быть пустым!')
      return
    }
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, description: newText, isEditing: false } : task
      )
      return { tasks: newTasks }
    })
  }

  toggleCompletion = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed
          if (newCompleted) {
            if (task.timerId) clearInterval(task.timerId)

            return {
              ...task,
              completed: true,
              timerRunning: false,
              timerId: null,
              minutes: 0,
              seconds: 0,
            }
          }
          return { ...task, completed: false }
        }
        return task
      })
      return { tasks: newTasks }
    })
  }

  counterTasks = () => {
    const { tasks } = this.state
    return tasks.filter((task) => !task.completed).length
  }

  setFilterValue = (filter) => {
    this.setState({ filterValue: filter })
  }

  clearAllTasks = () => {
    this.setState(({ tasks }) => {
      tasks.forEach((task) => {
        if (task.timerId) {
          clearInterval(task.timerId)
        }
      })
      return { tasks: [] }
    })
  }

  filteredTasks = () => {
    const { tasks, filterValue } = this.state
    if (filterValue === 'active') {
      return tasks.filter((task) => !task.completed)
    }
    if (filterValue === 'completed') {
      return tasks.filter((task) => task.completed)
    }
    return tasks
  }

  startTimer = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id !== id) return task

        if (task.timerRunning) return task

        const timerId = setInterval(() => {
          this.setState(({ tasks: currentTasks }) => {
            const updatedTasks = currentTasks.map((t) => {
              if (t.id !== id) {
                return t
              }

              if (!t.timerRunning) {
                clearInterval(t.timerId)
                return t
              }

              if (t.minutes === 0 && t.seconds === 0) {
                clearInterval(t.timerId)
                return { ...t, timerRunning: false, timerId: null }
              }

              let { minutes, seconds } = t
              if (seconds === 0) {
                if (minutes === 0) {
                  clearInterval(t.timerId)
                  return { ...t, timerRunning: false, timerId: null }
                }
                return { ...t, minutes: minutes - 1, seconds: 59 }
              }
              return { ...t, seconds: seconds - 1 }
            })
            return { tasks: updatedTasks }
          })
        }, 1000)

        return { ...task, timerRunning: true, timerId }
      })
      return { tasks: newTasks }
    })
  }

  pauseTimer = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          clearInterval(task.timerId)
          return { ...task, timerRunning: false, timerId: null }
        }
        return task
      })
      return { tasks: newTasks }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <Newtaskform addItem={this.addItem} />
        <Tasklist
          tasks={this.filteredTasks()}
          onDeleted={this.deleteItem}
          onToggleCompletion={this.toggleCompletion}
          onEdit={this.onEdit}
          onSaveEdit={this.saveEdit}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
        />
        <Footer
          counterTasks={this.counterTasks}
          setFilterValue={this.setFilterValue}
          filterValue={this.state.filterValue}
          clearAllTasks={this.clearAllTasks}
        />
      </section>
    )
  }
}
