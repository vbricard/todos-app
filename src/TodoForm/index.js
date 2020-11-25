import {Button} from '@material-ui/core';
import { useState } from 'react';


export default function TodoForm() {
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
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title..." value={formState.title} onChange={handleInputOnChange}/>
            <input type="date" name="dueDate" value={formState.dueDate} onChange={handleInputOnChange}/>
            <input type="checkbox" name="completed" checked={formState.completed} onChange={handleInputOnChange}/>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
    )
}