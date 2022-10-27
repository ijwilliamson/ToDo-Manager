import './ToDo-item.css';
import { ExclamationCircle } from 'react-bootstrap-icons';


const ToDoItem = (props) => {
    //props
    //  id, title, notes, created, doByDate, 
    //  complete, completedOn, category, urgent

    return(
      <toDo-item draggable="true">
        <toDo-icon>
        <ExclamationCircle color="red" size={24} />
        </toDo-icon>
        <toDo-info>
          <toDo-title>{props.title}</toDo-title>
          <toDo-date>{props.doByDate.toLocaleDateString()}</toDo-date>
          <toDo-cat>{props.category}</toDo-cat>
        </toDo-info>
      </toDo-item>
    )
    
}

export default ToDoItem;
