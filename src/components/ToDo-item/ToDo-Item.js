import { useState } from 'react';
import './ToDo-item.css';

import { ToDoIcon, AllToDoIcons } from '../ToDo-icons/ToDo-icons';




const ToDoItem = (props) => {
    //props
    //  id, title, notes, created, doByDate, 
    //  complete, completedOn, category, urgent

    const [iconsVisible, seticonsVisible] = useState(false)

    const toggleIconBar = (event) =>{
      console.log("toggle")
      const _iconsVisible = iconsVisible;
      seticonsVisible(!_iconsVisible) 
    }

    const changeIconHandler = (index) =>{
      // console.log(event.currentTarget.attributes[0].nodeValue)
      // let icon = event.currentTarget.attributes[0].nodeValue
       let _toDoObject = props.item;
       _toDoObject.icon = index;
       updateItem(_toDoObject)



      console.log(index)
    }

    const updateItem =(toDoObject)=>{
      console.log("begin update")
      props.update(toDoObject)
    }

    const deleteItem =()=>{
      console.log("begin delete")
      props.delete(props.item);
    }

    

    return(
      <toDo-item draggable="true"  >
     
        <toDo-icon onClick={toggleIconBar}>
          {ToDoIcon(props.item.icon)}
          <IconBar visible={iconsVisible}  iconChangedEvent={changeIconHandler} />
        </toDo-icon>

        <toDo-info>
          <toDo-title>{props.item.title}</toDo-title>
          <toDo-date>{new Date(props.item.doByDate).toLocaleDateString()}</toDo-date>
          <toDo-cat onClick={deleteItem}>{props.item.category}</toDo-cat>
        </toDo-info>
      </toDo-item>
    )
  
}

const IconBar = (props) => {
 
const classes = ()=>{
    return (props.visible) ? "visibleFlex" : "hide";
}
  return(
    <icon-bar class={classes()} >
      {AllToDoIcons().map((icon, index)=>{
        
        return (
          <icon-item key={index} 
                     onClick={()=>props.iconChangedEvent(index)}>
            {icon}
          </icon-item>
        )
        
      })}

      </icon-bar>
  )
}

export default ToDoItem;