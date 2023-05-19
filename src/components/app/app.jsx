import React, { useEffect, useState } from 'react'

import { AppHeader } from '../app-header/app-header'
import { NewTaskForm } from '../search-panel/search-panel'
import { TaskList } from '../todo-list/todo-list'
import './app.css'
import { Footer } from '../footer/footer'

function genId() {
  const IDs = []
  return function g() {
    let generate
    for (let i = 0; i < 100; i++) {
      generate = Math.floor(Math.random() * 10000)
      const result = IDs.indexOf(generate)
      if (result === -1) {
        break
      }
    }
    IDs.push(generate)
    return generate
  }
}
const generate = genId()

function App() {
  const todoData = [
    {
      status: 'active',
      task: 'First task',
      time: Date.now(),
      isCounting: true,
      timer: 200000,
      id: 1,
    },
    {
      status: 'active',
      task: 'Second task',
      time: Date.now(),
      isCounting: true,
      timer: 180000,
      id: 2,
    },
    {
      status: 'active',
      task: 'Third task',
      time: Date.now(),
      isCounting: true,
      timer: 150000,
      id: 3,
    },
  ]

  const [data, setDataState] = useState(todoData)
  const [filtered, setFiltered] = useState(data)
  const [filterBtn, setFilterBtn] = useState('all')

  useEffect(() => {
    function renderFilter() {
      if (filterBtn === 'all') {
        setFiltered(data)
      } else if (filterBtn === 'active') {
        const newArray = data.filter((item) => item.status === 'active')
        setFiltered(newArray)
      } else {
        const newArray = data.filter((item) => item.status === 'completed')
        setFiltered(newArray)
      }
    }
    renderFilter()
  }, [filterBtn, data])

  function tasksCompleteFunc(arr) {
    return arr.reduce((acc, item) => (item.status === 'completed' ? acc + 1 : acc), 0)
  }
  const tasksComplete = tasksCompleteFunc(data)

  function toggleTaskList(id) {
    if (id === 'all') {
      setFiltered(data)
      setFilterBtn('all')
    } else if (id === 'active') {
      setFilterBtn('active')
    } else {
      setFilterBtn('completed')
    }
  }

  const getIndex = (arr, id) => arr.findIndex((elem) => elem.id === id)

  const clearCompleted = () => {
    const newArray = []
    data.forEach((elem) => {
      if (elem.status !== 'completed') {
        newArray.push(elem)
      }
    })
    setDataState(newArray)
  }

  function timerUpdateState(id) {
    /* eslint-disable */
    let item
    let index

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item = data[i]
        index = i
      }
    }

    if (item.timer > 0) {
      item.timer = item.timer - 1000
      const newArray = [...data]
      newArray[index] = item
      setDataState(newArray)
    }
    /* eslint-enable */
  }

  const timerGo = (id) => {
    let item
    let index

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item = data[i]
        index = i
      }
    }
    item.isCounting = true
    const newArray = [...data]
    newArray[index] = item
    setDataState(newArray)
  }
  const timerStop = (id) => {
    let item
    let index

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item = data[i]
        index = i
      }
    }
    item.isCounting = false
    const newArray = [...data]
    newArray[index] = item
    setDataState(newArray)
  }

  const addItem = (task, min = 0, sec = 0) => {
    let timer = (min * 60 + sec) * 1000
    if (Number.isNaN(min) || Number.isNaN(sec)) {
      timer = 0
    }
    if (task && task.trim() !== 'active') {
      const newTask = {
        status: 'active',
        task,
        time: Date.now(),
        timer,
        isCounting: true,
        id: generate(data),
        //   display: 'show',
      }
      setDataState((d) => {
        const newArray = [...d, newTask]
        return newArray
      })
      // setInterval(downTimer.bind(this, newTask.id), 1000)
    }
  }

  const handleComplete = (status, id) => {
    const i = getIndex(data, id)
    const newArray = data.map((item, index) => {
      if (i === index) {
        if (status === 'completed') {
          return { ...item, status: 'active' }
        }
        return { ...item, status: 'completed' }
      }
      return item
    })

    setDataState(newArray)
  }

  const handleDeleteBtn = (id) => {
    const newArray = [...data]
    const indexDelete = getIndex(newArray, id)

    newArray.splice(indexDelete, 1)
    setDataState(newArray)
  }

  const handleEditBtn = (id) => {
    let newArray = [...data]
    const indexEdit = getIndex(newArray, id)
    newArray = data.map((item, index) => {
      if (index === indexEdit && item.status !== 'completed') {
        return { ...item, status: 'editing' }
      }
      return item
    })
    if (JSON.stringify(data) !== JSON.stringify(newArray)) {
      setDataState(newArray)
    }
  }

  const acceptChanges = (obj) => {
    const newArray = [...data]
    const indexAccept = getIndex(newArray, obj.id)
    newArray[indexAccept] = {
      ...newArray[indexAccept],
      status: 'active',
      task: obj.value,
    }

    setDataState(newArray)
  }

  return (
    <section className="app-wrapper">
      <AppHeader />
      <div className="app-interface">
        <NewTaskForm addFunc={addItem} />
        <TaskList
          todos={filtered}
          deleteFunc={handleDeleteBtn}
          completeFunc={handleComplete}
          editFunc={handleEditBtn}
          acceptFunc={acceptChanges}
          timerUpdateFunc={timerUpdateState}
          timerGo={timerGo}
          timerStop={timerStop}
        />
        <Footer complete={tasksComplete} clearFunc={clearCompleted} toggleFunc={toggleTaskList} />
      </div>
    </section>
  )
}

export default App
