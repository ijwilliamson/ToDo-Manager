import { useState } from 'react'
import './ToDo-Edit.css'
import IconBar from '../ToDo-IconBar/ToDo-IconBar';
import {ToDoIcon} from '../ToDo-icons/ToDo-icons';


const ToDoEditForm = (props) =>{
    //props
    //visible - true or false
    //item - toDoObject
    //update - function for handling the edited object
    //cancel - function for cancelling the edit

    
    const [formData, updateFormData] = useState(props.item);

    const [iconsVisible, seticonsVisible] = useState(false)

    const toggleIconBar = (event) =>{
      console.log("toggle")
      const _iconsVisible = iconsVisible;
      seticonsVisible(!_iconsVisible) 
    }

    const changeIconHandler = (index) =>{
      
    //   let _toDoObject = props.item;
    //   _toDoObject.icon = index;
    //   updateItem(_toDoObject)



    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(formData.id)
        console.log(props.item)

        const _formData = JSON.parse(JSON.stringify(formData))
        
        props.update(_formData)
        props.cancel()
    }

    const handleReset = (event) =>{
        props.cancel();
    }

    const handleOnChange = (event, field) => {
        // update state with the value of the form item
        let _formData = JSON.parse(JSON.stringify(formData))
        _formData[field] = event.currentTarget.value

        updateFormData(_formData)
    }


    if(typeof props.item === "undefined") return (<></>)
    if (props.visible===false) return (<></>)

    return (
        <div className="overlay">
        <form className='editform' 
                 onSubmit={handleSubmit}
                  onReset={handleReset} >
            
                <header>Edit To Do</header>
                <form-content>
                <input className="toDoTitle" value={formData.title}
                        id="fmTitle"  placeholder='Title'
                        onChange={(event) =>handleOnChange(event,"title" )}
                        />
                
                <toDo-icon onClick={toggleIconBar}>
                    {ToDoIcon(formData.icon)}
                    <IconBar visible={iconsVisible}  iconChangedEvent={changeIconHandler} />
                </toDo-icon>

                <div>
                    <span>Due date:</span> 
                    <input className="toDoDue" value={formData.doByDate} 
                        id="fmTate" type="date"
                        onChange={(event) =>handleOnChange(event,"doByDate" )} />
                </div>
                <select id="fmCat" value={formData.category}
                         onChange={(event) =>handleOnChange(event,"category" )} >

                    <option value="Uncatagorised">Select a Category</option>
                    <option value="Coding">Coding</option>
                    <option value="Development">Development</option>
                    <option value="Admin">Admin</option>
                    <option value="Telephone call">Telephone call</option>
                    <option value="Virtual meeting">Virtual meeting</option>

                </select>

                <textarea className="toDoNotes" value={formData.notes}
                          id="fmNotes"  placeholder='Notes'
                          onChange={(event) =>handleOnChange(event,"notes" )}
                          />

                </form-content>
                

                
                <footer>
                <button className="cancel" type='reset' >Cancel</button>
                <button  type='submit' >Save</button>
                </footer>
            
            </form>
        </div>

    )
}

export default ToDoEditForm