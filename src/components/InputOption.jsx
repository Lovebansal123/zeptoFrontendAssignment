import React from 'react'
import './inputOption.css'
export default function InputOption(props) {
  return (
<div className='inputOptionDiv' key={props.key} onClick={props.handleOnClick}>
<div className='profile'>
<img src={props.imgsrc} alt="" />
<span style={{fontWeight:'bold'}}>{props.name}</span>
</div>
<span>{props.email}</span>
</div>
  )
}
