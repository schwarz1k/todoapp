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

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((el) => el.id === id)

      const newArr = [...tasks.slice(0, index), ...tasks.slice(index + 1)]

      return {
        tasks: newArr,
      }
    })
  }

  addItem = (text) => {
    const newItem = {
      id: Math.random().toString(36).slice(2),
      description: text,
      created: new Date(),
      completed: false,
      isEditing: false,
    }

    this.setState(({ tasks }) => {
      const newArr = [...tasks, newItem]

      return {
        tasks: newArr,
      }
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

  toggleCompletion = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      return { tasks: newTasks }
    })
  }

  counterTasks = () => {
    const { tasks } = this.state
    const activeTasks = tasks.filter((task) => !task.completed)
    return activeTasks.length
  }

  setFilterValue = (filter) => {
    this.setState({ filterValue: filter })
  }

  clearAllTasks = () => {
    this.setState({ tasks: [] })
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

  saveEdit = (id, newText) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, description: newText, isEditing: false } : task
      )
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
          isEditing={this.isEditing}
          onSaveEdit={this.saveEdit}
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
