import React, { useEffect, useState } from 'react';
import Alert from './Alert'
import List from './List'
import './App.css'

//for store data
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('add items');

    if (!name) {
      //alert
      showAlert(true, 'please enter item')
    }
    else if (name && isEditing) {
      //deal with edit
      setList(list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name }
        }
        return item;
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'value change')
    }
    else {
      //show alert
      showAlert(true, 'item added to list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const clearList = () => {
    showAlert(true, 'empty list')
    setList([])
  }
  const removeItem = (id) => {
    showAlert(true, 'item removed');
    setList(list.filter((item) => item.id !== id))
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  const showAlert = (show = false, msg = "") => {
    setAlert({ show, msg })
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h1>To-Do List</h1>
        <input
          type="name"
          placeholder="Enter here..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button type='submit'>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </form>
      {
        list.length > 0 && (
          <div>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <br />
            <button onClick={clearList}>Clear List</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
