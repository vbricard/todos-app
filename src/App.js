import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { useEffect, useState } from 'react';

function App() {
  let [todos, setTodos] = useState([])

  const deleteTodo = async (todo) => {
    const url = `${process.env.REACT_APP_TODOS_URL}/${todo.id}`
    const response = await fetch(url, { method: 'DELETE' })
    console.log(response.status)
    fetchData()
}

  async function fetchData() {
    let response = null
    let data = null

    response = await fetch(process.env.REACT_APP_TODOS_URL)
    data = await response.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchData();
  }, [])

	const today = new Date()
    const strToday  = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate()
    let initFormState = {
        title:"le titre",
        dueDate:strToday,
        completed:false,
    }

    let [formState, setFormState] = useState(initFormState)
    
    const handleInputOnChange = (event) => {
        const target = event.target
        console.log(target.value, target.checked)
        const {name, value, checked, type} = target;
        setFormState({...formState, [name]: type!=='checkbox'?value:checked })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let response = await fetch(process.env.REACT_APP_TODOS_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({...formState, dueDate: Date.parse(formState.dueDate)})
          })
        console.log(response.status)
        fetchData()
    }


  return (
    <div className="App">
      <h1>Application Todo Contexte</h1>
      <TodoForm formState={formState} handleSubmit={handleSubmit} handleInputOnChange={handleInputOnChange}/>
      <TodoList todos={todos} onDeleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;
