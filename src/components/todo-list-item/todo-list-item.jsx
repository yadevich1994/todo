import React from 'react'
import propTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { TaskListItem } from '../todo-list-item-info/todo-list-item-info'
import { TaskBtns } from '../todo-list-item-btns/todo-list-item-btns'

export function Task({
  task,
  time,
  timer,
  isCounting,
  status,
  deleteFunc,
  completeFunc,
  id,
  display,
  isChecked,
  editFunc,
  acceptFunc,
  timerUpdateFunc,
  timerGo,
  timerStop,
}) {
  const created = `created ${formatDistanceToNow(time, {
    addSuffix: true,
    includeSeconds: true,
  })}`
  const checkVisibility = {
    display: status === 'editing' ? 'none' : 'flex',
  }
  const className = display ? 'list-group-item' : 'list-group-item hide'
  return (
    <li className={className}>
      <label className="todo-list-item__toggle" style={checkVisibility} htmlFor={id}>
        <input
          type="checkbox"
          className="toggle"
          checked={isChecked}
          id={id}
          onChange={() => completeFunc(status, id)}
        />
        <div className="toggle-checked">
          <p>&#x2713;</p>
        </div>
      </label>
      <TaskListItem
        task={task}
        time={created}
        timer={timer}
        isCounting={isCounting}
        status={status}
        completeFunc={() => completeFunc(status, id)}
        acceptFunc={(obj) => acceptFunc(obj)}
        id={id}
        timerUpdateFunc={() => timerUpdateFunc(id)}
        timerGo={() => timerGo(id)}
        timerStop={() => timerStop(id)}
      />
      <TaskBtns status={status} deleteFunc={() => deleteFunc(id)} id={id} editFunc={() => editFunc(id)} />
    </li>
  )
}
Task.defaultProps = {
  task: 'Возникла неопознанная ошибка',
  time: null,
  status: '',
  id: 1,
  display: 'show',
  isChecked: false,
}

Task.propTypes = {
  task: propTypes.string,
  time: propTypes.number,
  status: propTypes.string,
  id: propTypes.number,
  display: propTypes.oneOfType([propTypes.string, propTypes.oneOf([null])]),
  isChecked: propTypes.bool,
}
