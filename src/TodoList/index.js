import { Button } from '@material-ui/core';


export default function TodoList(props) {

    const todos = props.todos;

    return (
        <div>
            <h2>TodoList</h2>
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
                                <Button variant="contained" color="secondary" onClick={() => props.onDeleteTodo(todo)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}