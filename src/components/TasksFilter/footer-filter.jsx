import React from 'react'
import './footer-filter.css'

export function TasksFilter({ filterState, filterFunc }) {
  return (
    <div className="footer__filter" id="footerFilter">
      <div>
        <button
          id="all"
          type="button"
          className={filterState === 'all' ? 'selected' : ''}
          onClick={(e) => filterFunc(e)}
        >
          All
        </button>
      </div>
      <div>
        <button
          id="active"
          type="button"
          className={filterState === 'active' ? 'selected' : ''}
          onClick={(e) => filterFunc(e)}
        >
          Active
        </button>
      </div>
      <div>
        <button
          id="completed"
          type="button"
          className={filterState === 'completed' ? 'selected' : ''}
          onClick={(e) => filterFunc(e)}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

TasksFilter.defaultProps = {
  filterState: 0,
}
