import { useRef, useState, useEffect } from 'react';

const _LocalStorageKey = 'toDoManager.toDoItems2'
const _LocalAutoIdKey = 'toDoManager.autoId2'

const ToDoDataManager = () =>{

// Data Arrays and Local Storage

    const [tItems, tItemsUpdate] = useState([[],[],[],[],[]]);
    const [selectedItem, selectedItemUpdate] = useState(null);
    let autoId2 = useRef(1000);

    useEffect(() => {
        const localStorageToDos = JSON.parse(localStorage.getItem(_LocalStorageKey))
       
        if (tItems){
    
          if (localStorageToDos){
            tItemsUpdate(localStorageToDos)
            autoId2.current = Number(localStorage.getItem(_LocalAutoIdKey));
          }
        }
      }, [])
    
      useEffect(() => {
          if (tItems.length>0){
             localStorage.setItem(_LocalStorageKey, JSON.stringify(tItems))
             localStorage.setItem(_LocalAutoIdKey, autoId2.current)
          }
         
      }, [tItems])


//CRUD for managing data
//Could be replaced with Database functions.


const createToDo = (title, doDate, category, bin) =>{
    // Insert new To Do into the tItems

    console.log("handle insertToDo")
    let _tItems = [...tItems]

    // extract just the current bin items
    // const _bin = [..._tItems[bin]]
    
    // add the new item to the temp bin copy
    const newToDo =
        {id: autoId2.current,
          title: title,
          notes: "",
          created: new Date(),
          doByDate: doDate,
          complete: false,
          completedOn: null,
          category: category,
          urgent: false,
          icon: 0}

    // remove the old bin and insert the new bin
    _tItems[bin].push(newToDo)

    // update the items
    tItemsUpdate(_tItems)

    autoId2.current +=  1;
  }





}

export default ToDoDataManager;