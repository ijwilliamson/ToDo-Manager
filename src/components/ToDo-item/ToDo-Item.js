import { useState } from 'react';
import './ToDo-item.css';
import IconBar from '../ToDo-IconBar/ToDo-IconBar';
import {ToDoIcon} from '../ToDo-icons/ToDo-icons';

const ToDoItem = (props) => {
    //props
    //  id - autoId number
    //  item - to do object
    //  isSelected - bool
    //  update - function
    //  delete - function
    //  select - function

    const [iconsVisible, seticonsVisible] = useState(false)

    const toggleIconBar = (event) =>{
      console.log("toggle")
      const _iconsVisible = iconsVisible;
      seticonsVisible(!_iconsVisible) 
    }

    const changeIconHandler = (index) =>{
      
      let _toDoObject = props.item;
      _toDoObject.icon = index;
      updateItem(_toDoObject)

    }

    const updateItem =(toDoObject)=>{
      console.log("begin update")
      props.update(toDoObject)
    }

    const deleteItem =()=>{
      console.log("begin delete")
      props.delete(props.item);
    }

    const selectItem =(event) =>{
      console.log("begin selection")
      props.select(props.item)
      if(event.detail===2){
        props.edit();
      }
      
    }
    
    const onDragStart =(args)=>{
        let dragObject = JSON.stringify({id:props.item.id, bin:args.target.parentNode.attributes[0].value});
     
        args.dataTransfer.setData("text", dragObject)

    }


    return(
      <toDo-item draggable="true"
                 onDragStart={(args)=>onDragStart(args)}
                 class={(props.isSelected) ? "selected" : ""} 
                 onClick={selectItem}
                 >
     
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


export default ToDoItem;