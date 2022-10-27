import { useRef, useState, useEffect } from 'react';
import './App.css';
import ToDoItem from './components/ToDo-item/ToDo-Item';
import ToDoCreator from './components/ToDoCreator/ToDoCreator';

const _LocalStorageKey = 'toDoManager.toDoItems'
const _LocalAutoIdKey = 'toDoManager.autoId'

function App() {

  const [tItems, tItemsUpdate] = useState([]);
  const [selectedItem, selectedItemUpdate] = useState(null);
  let autoId = useRef(1000);

  useEffect(() => {
    const localStorageToDos = JSON.parse(localStorage.getItem(_LocalStorageKey))
   
    if (tItems){

      if (localStorageToDos){
        tItemsUpdate(localStorageToDos)
        autoId.current = Number(localStorage.getItem(_LocalAutoIdKey));
      }
    }
  }, [])

  useEffect(() => {
      if (tItems.length>0){
         localStorage.setItem(_LocalStorageKey, JSON.stringify(tItems))
         localStorage.setItem(_LocalAutoIdKey, autoId.current)
      }
     
  }, [tItems])



  //CRUD for managing data
  //Could be replaced with Database functions.

  const createToDo = (title, doDate, category) =>{
    // Insert new To Do into the tItems

    console.log("handle insertToDo")
    const _tItems = [...tItems]
    tItemsUpdate( [..._tItems,
      
        {id: autoId.current,
          title: title,
          notes: "",
          created: new Date(),
          doByDate: doDate,
          complete: false,
          completedOn: null,
          category: category,
          urgent: false,
          icon: 0}

    ])
    autoId.current +=  1;
  }

  const readToDo = (filter) => {
    let readArray = []
    if (tItems.length){
      readArray = tItems.map((item, id) => {
        return (
          <ToDoItem key={id} item={item} 
                    update={updateToDo}
                    delete={deleteToDo}
                    select={selectToDo}
                    isSelected={(item.id===selectedItem) ?true : false}
                    />
        )
      });
    }
    return(readArray)
  }

  const updateToDo = (toDoObject) => {
    let _tItems = [...tItems]

    _tItems.splice(toDoIndex(toDoObject.id),1,toDoObject)
    tItemsUpdate([..._tItems])

    console.log("end update")
  }

  const deleteToDo = (toDoObject) => {
    
    let _tItems = [...tItems]

    _tItems.splice(toDoIndex(toDoObject.id),1)
    tItemsUpdate([..._tItems])
        
    console.log("end delete")
  }

  const selectToDo = (toDoObject) => {
    selectedItemUpdate(toDoObject.id);
    console.log("selected Item Complete")
  }

  const keyPress = (event) => {
    //handle keyPress for to do navigation
  
    if(event.key==="ArrowDown"){
      toDoIndexChange(1)

    } else if (event.key ==="ArrowUp"){
      toDoIndexChange(-1)

    } 
    // else if (event.key ==="Delete" ||
    //            event.key ==="BackSpace") {
    //     console.log("got backspace")
    // }


  }

  const toDoIndexChange =(value)=>{
    //Change the selected Item based on its index position
    //value is the change required
    //i.e. -1 goes back 1 goes forward
   
    let newSelectedIndex = toDoIndex(selectedItem)+value;

    if (newSelectedIndex<0) newSelectedIndex=tItems.length-1
    if (newSelectedIndex>tItems.length-1) newSelectedIndex = 0
    
    selectedItemUpdate(tItems[newSelectedIndex].id)
    
  }

  const toDoIndex = (id)=>{
    let _tItems = [...tItems]
    const indexSearch = (item) => item.id === id;
    const index = _tItems.findIndex(indexSearch)
    return index
  }


  return (
    //This section needs work, it is not very dynamic and
    //probably goes overboard with the custom elements
    <to-Do>
      <toDo-header><ToDoCreator callback={createToDo}/></toDo-header>
      <toDo-main>
        <toDo-Col>
          <header>To Do</header>
          <toDo-content tabIndex={0} onKeyDown={keyPress}>
            {readToDo()}
          </toDo-content>
          <footer></footer>
        </toDo-Col>
        <toDo-Col>
        <header>Completed</header>
          <toDo-content>

          </toDo-content>
          
        </toDo-Col>
        <toDo-DayGroup>
          <toDo-Day>
            <header>URGENT</header>
          </toDo-Day>
          <toDo-Day>
          <header>PARKED</header>
          </toDo-Day>
          <toDo-Day>
            <header>BIN</header>
          </toDo-Day>
          </toDo-DayGroup>
      </toDo-main>
      <toDo-footer></toDo-footer>
      
    </to-Do>
  );
}




export default App;
