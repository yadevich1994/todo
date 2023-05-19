import React from 'react'

import { Task } from '../todo-list-item/todo-list-item'
import './todo-list.css'

export function TaskList({
  todos,
  deleteFunc,
  completeFunc,
  editFunc,
  acceptFunc,
  timerUpdateFunc,
  timerGo,
  timerStop,
}) {
  const elements = todos.map((item) => {
    const { id = id } = item
    return (
      <Task
        key={id}
        task={item.task}
        time={item.time}
        timer={item.timer}
        isCounting={item.isCounting}
        status={item.status}
        deleteFunc={() => deleteFunc(id)}
        completeFunc={() => completeFunc(item.status, item.id)}
        id={id}
        display={item.display}
        isChecked={item.status === 'completed'}
        editFunc={() => editFunc(id)}
        acceptFunc={(obj) => acceptFunc(obj)}
        timerUpdateFunc={() => timerUpdateFunc(id)}
        timerGo={() => timerGo(id)}
        timerStop={() => timerStop(id)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}
