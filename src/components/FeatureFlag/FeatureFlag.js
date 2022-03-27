import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLocalFiltering } from '../../app/flightSlice';

export default function FeatureFlag(){

    // const [hasLocalFiltering, setHasLocalFileting] = useState(true);
    const isLocalFiltering = useSelector((state) => state.flight.isLocalFiltering);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        console.log('FeatureFlag ', e.target.checked);
        //setHasLocalFileting(e.target.checked);
        localStorage.setItem('isLocalFiltering', JSON.stringify(e.target.checked));
        dispatch(setIsLocalFiltering(e.target.checked));
    };

    useEffect(()=>{
        const rs = JSON.parse(localStorage.getItem('isLocalFiltering'));
        if (rs){
            dispatch(setIsLocalFiltering(rs));
        }
        console.log('Init isLocalFiltering ', isLocalFiltering);
    },[])

    console.log('FeatureFlag Component ', isLocalFiltering)

    return (
        <React.Fragment>
             <Grid container spacing={2} m={2}>
                    <Grid item xs={2} >
 
                    </Grid>
                    <Grid item xs={8}>
                    <FormControlLabel control={
                        <Switch 
                            checked={isLocalFiltering}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}/>
                    } label="Enable local filtering function" />
                    </Grid>
                    <Grid item xs={2}>
                     
                    </Grid>
                </Grid>
        </React.Fragment>
    )
}