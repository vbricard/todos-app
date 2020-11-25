import {Button} from '@material-ui/core';

export default function TodoForm(props) {
    const formState = props.formState
    const handleInputOnChange = props.handleInputOnChange
    const handleSubmit = props.handleSubmit

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title..." value={formState.title} onChange={handleInputOnChange}/>
            <input type="date" name="dueDate" value={formState.dueDate} onChange={handleInputOnChange}/>
            <input type="checkbox" name="completed" checked={formState.completed} onChange={handleInputOnChange}/>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    )
}