import { useRef, useState, useEffect } from 'react';
import './App.css';
import ToDoItem from './components/ToDo-item/ToDo-Item';
import ToDoCreator from './components/ToDoCreator/ToDoCreator';
import ToDoEditForm from './components/ToDo-Edit/ToDo-Edit';
import ToDoContent from './components/ToDo-Container/ToDo-Container';

const _LocalStorageKey = 'toDoManager.toDoItems'
const _LocalAutoIdKey = 'toDoManager.autoId'

function App() {

 
  const [tItems, tItemsUpdate] = useState([[],[],[],[],[]]);
  const [selectedItem, selectedItemUpdate] = useState(null);
  const [currentBin, currentBinUpdate] = useState(0);

  const [editing, setEditing] = useState(false);
  
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
      let itemCount = 0;
      for (let i=0; i<tItems.length;i++){
        for(let ii=0;ii<tItems[i].length;i++){
          itemCount+=1;
          if (itemCount>0) break;
        }
        if (itemCount>0) break;
      }
      if (itemCount>0){
         localStorage.setItem(_LocalStorageKey, JSON.stringify(tItems))
         localStorage.setItem(_LocalAutoIdKey, autoId.current)
      }
     
  }, [tItems])

  //CRUD for managing data
  //Could be replaced with Database functions.

  const createToDo = (title, doDate, category) =>{
    // Insert new To Do into the tItems

    console.log("handle insertToDo")
    let _tItems = [...tItems]
    
    const newToDo =
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

    // add the new item to the currentBin of the temp tItems
    _tItems[currentBin].push(newToDo)

    // update the items
    tItemsUpdate(_tItems)

    autoId.current +=  1;
  }

  const readToDo = (bin) => {
    let readArray = []
    if (tItems[bin].length){
      readArray = tItems[bin].map((item, id) => {
        return (
          <ToDoItem key={id} item={item} 
                    update={updateToDo}
                    delete={deleteToDo}
                    select={selectToDo}
                    edit={toggleEdit}
                    isSelected={(item.id===selectedItem) ?true : false}/>
        )
      });
    }
    return(readArray)
  }

  const updateToDo = (toDoObject) => {
    let _tItems = [...tItems]

    let _currentBinItems = [..._tItems[currentBin]]

    _currentBinItems.splice(toDoIndex(toDoObject.id),1,toDoObject)
    
    _tItems.splice(currentBin,1,_currentBinItems)

    tItemsUpdate([..._tItems])

    console.log("end update")
  }

  const deleteToDo = (toDoObject) => {
    console.log(`type of = ${typeof toDoObject}`)
   
    // check the passed object is valid
    if (typeof toDoObject === "undefined") return;
    
    
    //Move selection to next item
    const index = toDoIndex(toDoObject.id);
    if (index === tItems[currentBin].length-1){
      toDoIndexChange(-1);
    } else {
      toDoIndexChange(1);
    }
    
    //Delete the to Do item    
    let _tItems = [...tItems]

    let _currentBinItems = [..._tItems[currentBin]]

    _currentBinItems.splice(index,1)
    
    _tItems.splice(currentBin,1,_currentBinItems)
    
    tItemsUpdate([..._tItems])
    
    console.log("end delete")
  }

// User Interaction functions

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
    } else if (event.key ==="ArrowLeft"){
      let _currentBin = currentBin;
      _currentBin = (_currentBin>0) ? currentBin-1 : 4;
      currentBinUpdate(_currentBin)
    } else if (event.key ==="ArrowRight"){
      let _currentBin = currentBin;
      _currentBin = (_currentBin<4) ? currentBin+1 : 0;
      currentBinUpdate(_currentBin)
    
    } 
    else if (event.key ==="Delete" || event.key ==="Backspace") {
      
      const toDoObject = tItems[currentBin][toDoIndex(selectedItem)]
      deleteToDo(toDoObject)
      console.log("got delete")}

  }

// To Do management functions

  const toDoIndexChange =(value)=>{
    //Change the selected Item based on its index position
    //value is the change required
    //i.e. -1 goes back 1 goes forward
   
    let newSelectedIndex = toDoIndex(selectedItem)+value;
    console.log(newSelectedIndex)
    if (newSelectedIndex<0) newSelectedIndex=tItems[currentBin].length-1
    if (newSelectedIndex>tItems[currentBin].length-1) newSelectedIndex = 0
    console.log(newSelectedIndex)

    selectedItemUpdate(tItems[currentBin][newSelectedIndex].id)
    
  }

  const toDoIndex = (id)=>{
    let _tItems = [...tItems[currentBin]]
    const indexSearch = (item) => item.id === id;
    const index = _tItems.findIndex(indexSearch)
    return index
  }

  const beginEdit = ()=>{
    const index = toDoIndex(selectedItem);
    const toDoObject = tItems[currentBin][index];
    return toDoObject
  }

  const toggleEdit = ()=>{
    setEditing(!editing)
    console.log("toogle edit")
  }

  const onBinFocus = (event)=>{
    const binId = event.currentTarget.attributes[0].value
    console.log(event.currentTarget.attributes[0].value)
    currentBinUpdate(binId)
  }

  const processDrag = (data, newBin) =>{
      
      //get Items
      let _tItems = [...tItems]
      
      // get item index
      const indexSearch = (item) => item.id === data.id;
      const index = _tItems[data.bin].findIndex(indexSearch)

      //copy item to new bin
      let _tItem = JSON.parse(JSON.stringify(_tItems[data.bin][index])) 
      _tItems[newBin].push(_tItem)

      //delete orignal item
      _tItems[data.bin].splice(index,1)
  
      tItemsUpdate([..._tItems])
      
      console.log("end move")





  }


// JSX return

  return (
    //This section needs work, it is not very dynamic and
    //probably goes overboard with the custom elements
    <>
    {(editing) ?
      <ToDoEditForm visible={editing} update={updateToDo} cancel={toggleEdit} item={(editing)?beginEdit():undefined}/>
      :
      <></>
    }
    
    <to-Do>
      <toDo-header><ToDoCreator callback={createToDo} onFocus={onBinFocus}/></toDo-header>
      <toDo-main>

        <toDo-Col>
          <header>To Do</header>
           <ToDoContent binId={0} read={readToDo} processDrag = {processDrag}
                        keydown={keyPress} focus={onBinFocus} 
                        selected={(currentBin==0)?true : false}/>
        
        </toDo-Col>

        <toDo-Col>
        <header>Completed</header>
        <ToDoContent binId={1} read={readToDo} processDrag = {processDrag}
                        keydown={keyPress} focus={onBinFocus} 
                        selected={(currentBin==1)?true : false}/>
          
        </toDo-Col>

        <toDo-DayGroup>

          <toDo-Day>
            <header>URGENT</header>
            <ToDoContent binId={2} read={readToDo} processDrag = {processDrag}
                        keydown={keyPress} focus={onBinFocus} 
                        selected={(currentBin==2)?true : false}/>
          </toDo-Day>

          <toDo-Day>
            <header>PARKED</header>
            <ToDoContent binId={3} read={readToDo} processDrag = {processDrag}
                        keydown={keyPress} focus={onBinFocus} 
                        selected={(currentBin==3)?true : false}/>
          </toDo-Day>

          <toDo-Day>
            <header>BIN</header>
            <ToDoContent binId={4} read={readToDo} processDrag = {processDrag}
                        keydown={keyPress} focus={onBinFocus} 
                        selected={(currentBin==4)?true : false}/>
          </toDo-Day>

        </toDo-DayGroup>
      </toDo-main>
      <toDo-footer></toDo-footer>
      
    </to-Do>
    </>
  );
}



export default App;
