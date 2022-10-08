import React, { useState } from 'react';
import CountryData from './CountryData';


const Countries = (props) => {
    let filterData = props.filterData;
    const [buttonID,setButtonID] = useState('');
    return(
        <div>
            {
            filterData.length >= 10 ? 
            <div>Too many matches, please specify another filter</div>
            :
            filterData.length > 1 ?
            <div>{filterData.map((country) => (
                <div key={country.name.common}>
                    <div key={country.name.common}>
                    {country.name.common} <button onClick={()=> setButtonID(country.name.common)}>show</button>
                    {buttonID === country.name.common ? <CountryData country={country} className={country.name.common}/> : null}
                    </div>
                </div>
                ))}
            </div> 
            :
            <div>
                {filterData.map((country) =>(
                    <CountryData country={country} />
                ))}
            </div>
          }
        </div>
    )
}

export default Countries