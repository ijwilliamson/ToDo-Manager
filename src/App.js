import { useState } from 'react';

import './App.css';
import ToDoItem from './ToDo-Item';
import ToDoCreator from './ToDoCreator';
import toDos from './startingItems';

let firstRun = true;


function App() {

  const [tItems, tItemsUpdate] = useState([]);
  

  if(firstRun) {
    
    tItemsUpdate([...toDos]);
    firstRun = false;
  }
  

    const JSXArray = toDos.map((item, id) => {
      return (
        <ToDoItem key={id} title={item.title}
        notes={item.notes} created={item.created}
        doByDate={item.doByDate} complete={item.complete}
        completedOn={item.completedOn} category={item.category}
        urgent={item.urgent} ></ToDoItem>
      )
    });



  return (
    <to-Do>
      <toDo-header><ToDoCreator/></toDo-header>
      <toDo-main>
        <toDo-Col>
          <header>To Do</header>
          <toDo-content>
            {JSXArray}
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
