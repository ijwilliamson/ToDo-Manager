const ToDoContent = (props) => {

    //props 
    //read function
    //bin Id
    //selected function
    //keyPress function
    //processDrag function
  

    
    //Drag and Drop Events
  

    const onDragOver = (event)=>{
        event.preventDefault();
        event.stopPropagation();
    }

    const onDrop = (args)=>{
        args.preventDefault()
        args.stopPropagation()
        let data = args.dataTransfer.getData("text");
        console.log(data)
        console.log(props.processDrag)
        props.processDrag(JSON.parse(data),props.binId);
    }
    
    const JSX = props.read(props.binId);
    
    return (
      <toDo-content binId={props.binId} tabIndex={0} 
                    onKeyDown={props.keydown} 
                    onFocus={props.focus}
                    onDragOver={onDragOver}
                    onDrop={(args)=>onDrop(args)}
                    class={(props.selected)?"contentSelected":""}>
      {JSX}
    </toDo-content>
    )
  
  } 
  export default ToDoContent