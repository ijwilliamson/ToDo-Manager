import { ExclamationCircle } from 'react-bootstrap-icons';
import { Archive } from 'react-bootstrap-icons';
import { Bug } from 'react-bootstrap-icons';
import { ChatDots } from 'react-bootstrap-icons';
import { Envelope } from 'react-bootstrap-icons';
import { Folder } from 'react-bootstrap-icons';
import { Lightbulb } from 'react-bootstrap-icons';
import { Telephone } from 'react-bootstrap-icons';

const Icons =[
    <ExclamationCircle color="red" size={24} />,
    <Archive color="green" size={24}/>,
    <Bug color="blue" size={24}/>,
    <ChatDots color="brown" size={24}/>,
    <Envelope color="mauve" size={24}/>,
    <Folder color="purple" size={24}/>,
    <Lightbulb color="azure" size={24}/>,
    <Telephone color="yellow" size={24}/>
]

const ToDoIcon=(value) => {
    
    return Icons[value];
    
   }

const AllToDoIcons=() => {
    return Icons;
}

export  {ToDoIcon, AllToDoIcons};