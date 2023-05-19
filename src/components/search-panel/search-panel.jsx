import React, { useState } from 'react'
import './search-panel.css'

export function NewTaskForm({ addFunc }) {
  const [value, addNewTask] = useState('')
  const [minValue, setMinValue] = useState('')
  const [secValue, setSecValue] = useState('')

  const handleFormChanges = (e) => addNewTask(e.target.value)
  const handleMinChanges = (e) => setMinValue(e.target.value)
  const handleSecChanges = (e) => setSecValue(e.target.value)

  const handleSubmitForm = (e) => {
    e.preventDefault()
    addNewTask('')
    setMinValue('')
    setSecValue('')
    addFunc(value, Number(minValue), Number(secValue))
  }

  return (
    <form className="search-panel-wrapper" onSubmit={handleSubmitForm}>
      <input placeholder="What needs to be done?" className="search-panel" onChange={handleFormChanges} value={value} />
      <input placeholder="Min" className="search-panel timer" onChange={handleMinChanges} value={minValue} />
      <input placeholder="Sec" className="search-panel timer" onChange={handleSecChanges} value={secValue} />
      <button type="submit" hidden>
        Add task
      </button>
    </form>
  )
}
