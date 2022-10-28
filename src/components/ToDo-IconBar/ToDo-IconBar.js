import './ToDo-IconBar.css'
import {AllToDoIcons } from '../ToDo-icons/ToDo-icons';


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


export default IconBar
