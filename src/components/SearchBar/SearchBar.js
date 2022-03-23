import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchFlight, setIsNewSearch, setQuery, setShowFilterList , setFilterList} from '../../app/flightSlice';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {getFlightsByNameStops} from '../../services/flight.service';

const findByNameAndStops = (data, name, stops) => {

    let arr = [];
    data.forEach( obj =>{
        // console.log('Add AirlineName and Stops ', obj.AirlineName, name, stops)
        if (obj.AirlineName.toLowerCase().includes(name) && obj.Stops == stops) {
            arr.push(obj);
        }
    })

    return arr;
}

const findByNameOnly = (data, name) => {
    let arr = []
    data.forEach( obj =>{
        // console.log('Add AirlineName ', obj.AirlineName, name)
        if (obj.AirlineName.toLowerCase().includes(name)) {
            arr.push(obj)
        }
    })
    return arr;
}

const findByStopsOnly = (data, stops) => {
    let arr = []
    data.forEach( obj =>{
        // console.log('Add stops ', obj.Stops, stops)
        if (obj.Stops == stops ) {
            arr.push(obj)
        }
    })
    return arr;
}

const getFilterList = (data) => {
    let arr = [];
    data.forEach( (obj)=> {
        let found = false;
        for (let i=0; i<arr.length; i++) {
            if (obj.AirlineName === arr[i].name) {
                found = true;
                break;
            }
        }
        if( !found ){
            let newElem = {
                name: obj.AirlineName.trim(),
                checked:true    
            }
            arr.push(newElem);
        }
    });
    return arr;
}

export default function SearchBar(){
    
    const [name, setName] = useState("");
    const [stops, setStops] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let strName = null;
        if (name) {
            strName = name.trim().toLowerCase()
        }
                  
        if (!strName && !stops){
            alert('Please enter Airline name and/or Number of stops field');
        }else{
            let query = {
                name: strName,
                stops: stops
            };
            dispatch(setQuery(query));
            
            //Find out if the data needs to be filtered locally
            getFlightsByNameStops(strName, stops)
            .then(data=>{
                console.log('newData ', data);
                dispatch(searchFlight(data));
                console.log('SearchBar isNewSearch ', true)
                dispatch(setIsNewSearch(true));
                if (data.length > 0){
                    let filterList = getFilterList(data);
                    dispatch(setFilterList(filterList));
                    dispatch(setShowFilterList(true));
                }else{
                    dispatch(setFilterList([]));
                    dispatch(setShowFilterList(false));
                }  
            });
             
     
        }
    }

    return(
        <React.Fragment>
           <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} >
                        <TextField
                            error={false}
                            id="name"
                            label="Airline Name"
                            fullWidth
                            onChange={e=>setName(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        <TextField
                            error={false}
                            id="stops"
                            label="Number of Stops"
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={e=>setStops(e.target.value)}
                            fullWidth 
                            />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button 
                            variant="contained"
                            onClick={handleSubmit}
                        >Search
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}