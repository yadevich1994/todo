import React, { useState } from 'react'
import './todo-list-item-info.css'

function TaskListItem({ task, time, status, completeFunc, changeFunc, acceptFunc, id }) {
  const className = `description ${status}`

  const [stateInfo, editTask] = useState({ value: '', id })

  const handleFormChanges = (e) => {
    editTask({ value: e.target.value, id })
  }
  const handleSubmitForm = (e) => {
    acceptFunc(stateInfo)
    e.preventDefault()
    editTask({ value: '', id })
  }

  if (status === 'editing') {
    return (
      <label className="todo-list-item-info todo-list-item-info__editing" htmlFor="id_editTask1">
        <span className={className}>
          <form onSubmit={handleSubmitForm} id="id_editTask1">
            <input type="text" onChange={handleFormChanges} value={stateInfo.value} />
          </form>
        </span>
      </label>
    )
  }
  return (
    <label className="todo-list-item-info" htmlFor="id_editTask2">
      <span
        className={className}
        role="textbox"
        tabIndex={0}
        onClick={() => completeFunc(status, id)}
        onChange={() => changeFunc}
        onKeyDown={() => changeFunc}
        id="id_editTask2"
      >
        {task}
      </span>
      <span className="created">{time}</span>
    </label>
  )
}

export default TaskListItem
