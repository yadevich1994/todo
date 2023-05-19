import React, { useEffect, useState } from 'react'
import './todo-list-item-info.css'

export function TaskListItem({
  task,
  time,
  timer,
  isCounting,
  status,
  completeFunc,
  changeFunc,
  acceptFunc,
  id,
  timerUpdateFunc,
  timerGo,
  timerStop,
}) {
  const className = `description ${status}`

  const [stateInfo, editTask] = useState({ value: '', id })
  const [stateTimer, setStateTimer] = useState(['', ''])

  useEffect(() => {
    function downTimer() {
      if (isCounting) {
        let minutes = Math.floor(timer / 1000 / 60)
        let seconds = (timer / 1000) % 60

        minutes = minutes < 10 ? `0${minutes}` : minutes
        seconds = seconds < 10 ? `0${seconds}` : seconds

        if (timer <= 0) {
          setStateTimer(['00', '00'])
        } else {
          setStateTimer([minutes, seconds])
        }

        timerUpdateFunc(id)
      }
    }
    const x = setInterval(downTimer, 1000)
    return () => clearInterval(x)
  }, [id, timer, isCounting, timerUpdateFunc])

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
      <div className="timer-controls">
        <button type="button" aria-label="go" onClick={() => timerGo(id)} className="playBtn" />
        <button type="button" aria-label="stop" onClick={() => timerStop(id)} className="pauseBtn" />
        <p>{stateTimer.join(':')}</p>
      </div>
      <span className="created">{time}</span>
    </label>
  )
}
