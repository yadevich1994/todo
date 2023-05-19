import React from 'react'
import './todo-list-item-btns.css'

function TaskBtns({ status, deleteFunc, id, editFunc }) {
  if (status !== 'editing') {
    return (
      <div className="item-btns-group">
        <button type="button" onClick={() => editFunc(id)} aria-label="Edit" />
        <button type="button" onClick={() => deleteFunc(id)} aria-label="Delete" />
      </div>
    )
  }
}

export default TaskBtns
