import { useState } from 'react';
import './ToDoCreator.css'

const ToDoCreator = (props) =>{

    const [title, setTitle] = useState("")
    const [date, setDate] = useState("2022-10-27")
    const [category, setCategory] = useState("Uncategorised")
    const [error, setError] = useState(false);


    const handleCallBack = (event) => {
        event.preventDefault();
        console.log("handleCallBack")

        if(title===""){
            setError(true)
            return;
        }else{
            setError(false)
        }

        //testing, need to pickup the form values to replace
        //hard coded items
        props.callback(title, date, category);
        setTitle("")

    }

    const handleOnChange = (event, funct) => {
        // update state with the value of the form item
        funct(event.currentTarget.value)
        if(event.currentTarget.id === "fmTitle"){
            setError(false);
        }
    }

    return (
        <toDo-creator>
            <form onSubmit={handleCallBack}>

                <input id="fmTitle" className={(error) ? 'submitName error' : 'submitName'} value={title} placeholder='Create a new item' 
                        onChange={(event) =>handleOnChange(event, setTitle)}/>

                <input id="fmTate" className='submitDate' value={date} type="date" 
                        onChange={(event) =>handleOnChange(event, setDate)}/>

                <select id="fmCat" className='submitCat' value={category}
                        onChange={(event) =>handleOnChange(event, setCategory)} >

                    <option value="Uncatagorised">Select a Category</option>
                    <option value="Coding">Coding</option>
                    <option value="Development">Development</option>
                    <option value="Admin">Admin</option>
                    <option value="Telephone call">Telephone call</option>
                    <option value="Virtual meeting">Virtual meeting</option>

                </select>

                <button className="submitButton" type='submit' >Save</button>

            </form>
        </toDo-creator>
    )
}

export default ToDoCreator;
