import React, { useState } from 'react'

import './footer.css'
import TasksFilter from '../TasksFilter/footer-filter'

export default function Footer({ complete, clearFunc, toggleFunc }) {
  const TaskFilterId = 0
  const [filterId, setTaskFilter] = useState(TaskFilterId)

  function changeFilter(event) {
    const id = event.target.id
    setTaskFilter(id)
    toggleFunc(id)
  }
  return (
    <div className="footer">
      <div className="footer__items-left">
        <span>{complete} items left</span>
      </div>
      <TasksFilter filterState={filterId} filterFunc={changeFilter} />
      <div className="footer__clear">
        <button type="button" className="footer__clear-btn" onClick={() => clearFunc()}>
          Clear completed
        </button>
      </div>
    </div>
  )
}

Footer.defaultProps = {
  complete: 0,
}
