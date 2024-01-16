import React, {useState, useEffect} from 'react'
import data from '../data/Listdata.json'
import './searchBar.css'
import SelectedChip from '../components/SelectedChip';
import InputOption from '../components/InputOption';
export default function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const [selectedChips, setSelectedChips] = useState([]);
    const [myInputOptions, setInputOptions] = useState(data);
    const [backspaceCount, setBackspaceCount] = useState(1);
    const [hideDropdown, sethideDropdown] = useState(true);
    useEffect(() => {
      const handleKeyDown = async (event) => {
        if (event.key === 'Backspace' && inputValue === '' && selectedChips.length>0) {
          setBackspaceCount(backspaceCount + 1);
  
          if (backspaceCount >= 2) {
            const lastChip = selectedChips[selectedChips.length - 1];
            if (lastChip) {
              handleRemoveChip(lastChip);
              setBackspaceCount(1); 
            }
          }
        } else {
          setBackspaceCount(1); 
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    });
    const handleRemoveChip=(itemToRemove)=>{
        const updatedItems = selectedChips.filter((item)=>item.id!==itemToRemove.id);
        setSelectedChips(updatedItems);
        setInputOptions([...myInputOptions, itemToRemove]);
    }
    const handleOnChangeInput=(event)=>{
        setInputValue(event.target.value);
    }
    const handleSelectChip=(itemToAdd)=>{
        setSelectedChips([...selectedChips, itemToAdd]);
        const updatedItems = myInputOptions.filter((item)=>item.id!==itemToAdd.id);
        setInputOptions(updatedItems);
        setInputValue('');
    }
    const handleVisibilty=()=>{
      sethideDropdown(false);
    }
  return (
    <div className='searchBarDiv'>
      <div className='selectedChips' style={{display: 'flex', flexWrap: 'wrap'}}>
          {
            selectedChips.map((item, index)=><SelectedChip key={item.id} name={item.name} imgsrc={item.profile} handleOnClick={()=>handleRemoveChip(item)} lastElement={index===selectedChips.length-1} highlight={backspaceCount}/>)
          }
      </div>
      <div className="inputFull">
        <div className="inputField" >
            <input
             type='text'
             value={inputValue}
             placeholder='Add new user...'
             onClick={handleVisibilty}
             onChange={handleOnChangeInput} 
            />

        </div>
        <div className="inputOptions" style={{display: hideDropdown?'none': 'block'}}>
          
             {myInputOptions
             .filter((item)=> item.name.toLowerCase().includes(inputValue.toLowerCase()))
             .map((item)=><InputOption key={item.id} imgsrc={item.profile} name={item.name} email={item.email} handleOnClick ={()=>handleSelectChip(item)} />
             ) 
             }
          
        </div>
      </div>
    </div>
  )
}
