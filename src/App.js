import React, { useEffect, useState } from 'react';
import Alert from './Alert'
import List from './List'


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
  const [alert, setAlert] = useState({ show: false, msg: '', type: '', })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('add items');

    if (!name) {
      //display alert
      // setAlert({ show: true, msg: 'Please enter value', type: 'danger' })
      showAlert(true, 'danger', 'please enter item')
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
      showAlert(true, 'success', 'value change')
    }
    else {
      //set list
      //show alert
      showAlert(true, 'success', 'item added to list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }
  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className='section-center'>
      <form className='list-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h1>To-Do List</h1>

        <div className='form-control'>
          <input
            type="text"
            placeholder="Enter here..."
            className='form-input'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {
        list.length > 0 && (
          <div className='list-container'>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <br />
            <button className='clear-btn' onClick={clearList}>Clear List</button>
          </div>
        )
      }
    </section>
  );
}

export default App;
