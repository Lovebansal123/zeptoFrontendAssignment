import React from 'react'
import './selectedChip.css'
export default function SelectedChip(props) {
  const myStyle = {
    border: props.highlight===2&&props.lastElement ? '2.5px solid blue' : '2.5px solid #c5c1c1',
  };
  
  return (
    <div className='selectChipDiv' key={props.key} style={myStyle}>
        <img src={props.imgsrc} alt="" />
        <p>{props.name}</p>
        <button onClick={props.handleOnClick}>X</button>
    </div>
  )
}
