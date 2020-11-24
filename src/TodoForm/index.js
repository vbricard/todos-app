import {Button} from '@material-ui/core';

export default function TodoForm() {
    return (
        <form >
            <input type="text" name="title" placeholder="Title..."/>
            <input type="date" name="duedate"/>
            <input type="checkbox" name="completed"/>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    )
}