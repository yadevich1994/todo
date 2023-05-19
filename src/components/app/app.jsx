import React, { useEffect, useState } from 'react'

import AppHeader from '../app-header/app-header'
import NewTaskForm from '../search-panel/search-panel'
import TaskList from '../todo-list/todo-list'
import './app.css'
import Footer from '../footer/footer'

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
      id: 1,
    },
    {
      status: 'active',
      task: 'Second task',
      time: Date.now(),
      id: 2,
    },
    {
      status: 'active',
      task: 'Third task',
      time: Date.now(),
      id: 3,
    },
  ]
  const [data, setDataState] = useState(todoData)
  const [filtered, setFiltered] = useState(data)

  useEffect(() => {
    setFiltered(data)
  }, [data])
  function tasksCompleteFunc(arr) {
    return arr.reduce((acc, item) => (item.status === 'completed' ? acc + 1 : acc), 0)
  }
  const tasksComplete = tasksCompleteFunc(data)

  function toggleTaskList(id) {
    if (id === 'all') {
      setFiltered(data)
    } else {
      const newArray = data.filter((item) => item.status === id)
      setFiltered(newArray)
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

  const addItem = (task) => {
    if (task && task.trim() !== 'active') {
      const newTask = {
        status: 'active',
        task,
        time: Date.now(),
        id: generate(data),
        display: 'show',
      }
      setDataState((d) => {
        const newArray = [...d, newTask]
        return newArray
      })
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
        />
        <Footer complete={tasksComplete} clearFunc={clearCompleted} toggleFunc={toggleTaskList} />
      </div>
    </section>
  )
}

export default App
