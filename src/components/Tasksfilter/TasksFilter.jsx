import React from 'react'

import FilterButton from '../FilterButton/FilterButton'
import './TasksFilter.css'

const TasksFilter = ({ filterValue, setFilterValue }) => {
  return (
    <ul className="filters">
      <FilterButton text="All" isSelected={filterValue === 'all'} onClick={() => setFilterValue('all')} />
      <FilterButton text="Active" isSelected={filterValue === 'active'} onClick={() => setFilterValue('active')} />
      <FilterButton
        text="Completed"
        isSelected={filterValue === 'completed'}
        onClick={() => setFilterValue('completed')}
      />
    </ul>
  )
}

export default TasksFilter
