import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchFlight, setIsNewSearch, setFilterList } from '../../app/flightSlice';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { getFlightsByNameStops, filterBySelectedNames } from '../../services/flight.service';

const setStatusAirlineFromList = (curList, name, status) =>{
    console.log('setStatusAirlineFromList ', curList)
    let newArray = JSON.parse(JSON.stringify(curList));

    for ( let i=0; i< newArray.length; i++ ) {
        if ( newArray[i].name === name ) {
            newArray[i].checked = status;
            break;
        }
    }
    return newArray;
}

const getNamesFromList = (curList) => {
    const newArr = []
    curList.forEach( obj =>{
        if( obj.checked ){
            newArr.push(obj.name);
        }
    });

    return newArr;
}

export default function Menu() {

    const query = useSelector((state) => state.flight.query);
    let filterList = useSelector((state) => state.flight.filterList);
    const dispatch = useDispatch();
    const [list,setList] = useState([]);


    const handleCheckedItem = (e) =>{

        let newList = null;
        if (e.target.checked){
            newList = setStatusAirlineFromList(filterList, e.target.value, true);
        }else{
            newList = setStatusAirlineFromList(filterList, e.target.value, false);
        }
        console.log('MENU NEWLIST ', newList)
        setList(newList);
        dispatch(setFilterList(newList));
        let newNames = getNamesFromList(newList);
       
        getFlightsByNameStops(query.name, query.stops)
        .then(data=>{
            let newData = filterBySelectedNames(data, newNames);
            dispatch(searchFlight(newData));
            dispatch(setIsNewSearch(false));  
        });
    }

    return (
        <React.Fragment>
            {
                filterList.length > 0 ? 
                <div>
                <Box> Filter by Airlines: </Box>
                <FormGroup>
                   {filterList.map((row, idx)=>(
                       <FormControlLabel key={idx} control={<Checkbox checked={row.checked} onChange={handleCheckedItem} value={row.name} />} label={row.name} />
                       ))}

               </FormGroup>
               </div> 
               :
               null
            }
           
        </React.Fragment>
    )
}