import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function FeatureFlag(){

    const [isLocalFiltering, setIsLocalFileting] = useState(false);
    const handleChange = (e) => {
        //setChecked(event.target.checked);
        console.log('FeatureFlag ', e.target.checked);
        setIsLocalFileting(e.target.checked);
        localStorage.setItem('isLocalFiltering', JSON.stringify(e.target.checked));
    };

    useEffect(()=>{
        const rs = JSON.parse(localStorage.getItem('isLocalFiltering'));
        if (rs){
            setIsLocalFileting(rs);
        }
        console.log('Init isLocalFiltering ', isLocalFiltering);
    },[])

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