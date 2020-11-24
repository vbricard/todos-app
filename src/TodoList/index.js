import { useEffect, useState } from 'react';
// import { DataGrid } from '@material-ui/data-grid';
import { Button} from '@material-ui/core';

export default function TodoList() {

    const deleteTodo = (todo) => {
        const url = `${process.env.REACT_APP_TODOS_URL}/${todo.id}`
        const response = await fetch(url, {method: 'DELETE'})
        console.log(response.status)
        setTodos(todos.filter(item => item.id !== todo.id))
     }

    
    let [todos, setTodos] = useState([])
    // let [users, setUsers] = useState([])
    let columns = [
        { field: 'id', headerName: 'ID', width:'100px'},
        { field: 'title', headerName: 'Title', width:'700px'},
        { field: 'dueDate', headerName: 'Due Date', width:'150px', valueFormatter: (params: ValueFormatterParams) =>
        (new Date(params.value).toLocaleDateString())}
    ]

    useEffect(() => {
        async function fetchData() {
            let response = null
            let data = null
            // response = fetch(process.env.REACT_APP_USERS_URL)
            // data = response.json()
            // setUsers(data)

            response = await fetch(process.env.REACT_APP_TODOS_URL)
            data = await response.json()
            setTodos(data)
        }
        fetchData();
    }, [])

    return (
        <div>
            <h2>TodoList</h2>
            {/* <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={todos} columns={columns} />
            </div> */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>dueDate</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {todos.map(todo => 
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{new Date(todo.dueDate).toLocaleDateString()}</td>
              <td>{todo.completed}</td>
              <td>
                <Button variant="contained" color="secondary" onClick={() => deleteTodo(todo)}>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
    )
}