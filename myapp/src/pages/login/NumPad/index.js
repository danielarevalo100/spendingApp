import React from 'react'
import './styles.css'
import BackspaceIcon from '@material-ui/icons/Backspace';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const NumPad = (props) => {
    let numbers = [1,2,3,4,5,6,7,8,9,17,0,15]
    const {handleClick} = props
return <div className="row">{numbers.map( (number,i) => (<div key={number} className="numPad col s4" onClick={(e) => handleClick(e,number)}><a className="waves-effect waves-light indigo btn">{number == 17?<BackspaceIcon/>:number == 15? <LockOpenIcon/>: number}</a>
    </div>) )
    
    }</div>
}

export default NumPad