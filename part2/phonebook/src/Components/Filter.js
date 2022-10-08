import React from 'react'

const Filter = (props) =>{
    let setSearchName = props.setField;
    return(
    <div>
        filter shown with <input onChange={(inp)=>{setSearchName(inp.target.value);}}/>
    </div>
    )
}

export default Filter;