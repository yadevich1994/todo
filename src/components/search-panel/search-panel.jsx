import React, { useState } from 'react'
import './search-panel.css'

function NewTaskForm({ addFunc }) {
  const [value, addNewTask] = useState('')
  const handleFormChanges = (e) => addNewTask(e.target.value)
  const handleSubmitForm = (e) => {
    e.preventDefault()
    addNewTask('')
    addFunc(value)
  }
  return (
    <form className="search-panel-wrapper" onSubmit={handleSubmitForm}>
      <input placeholder="What needs to be done?" className="search-panel" onChange={handleFormChanges} value={value} />
    </form>
  )
}

export default NewTaskForm
