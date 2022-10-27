import './ToDoCreator.css'

const ToDoCreator = () =>{

    return <toDo-creator>
                <input className='submitName' placeholder='Create a new item'/>
                <input className='submitDate' type="date" placeholder='Date due'></input>
                <select className='submitCat' defaultValue='' >
                <option value="">Select a Category</option>
                    <option value="coding">Coding</option>
                    <option value="development">Development</option>
                    <option value="admin">Admin</option>
                    <option value="telephone call">Telephone call</option>
                    <option value="virtual meeting">Virtual meeting</option>
                </select>
                <button className="submitButton">Save</button>
            </toDo-creator>
}

export default ToDoCreator;
