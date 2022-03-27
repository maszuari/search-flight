import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';

export default function NavBar() {

    //const [isLocalFiltering, setIsLocalFiltering] = useState(JSON.parse(localStorage.getItem('isLocalFiltering')))
    const isLocalFiltering = useSelector((state)=>state.flight.isLocalFiltering);
    const [filteringLabel, setFilteringLabel] = useState("");

    useEffect(()=>{
        // const isLocalFiltering = JSON.parse(localStorage.getItem('isLocalFiltering'));
        if (!isLocalFiltering){
            setFilteringLabel('Remote filtering');
        }else {
            setFilteringLabel('Local filtering');
        }
    },[isLocalFiltering])

    const changeColor = () =>{

    }

    return (
        <React.Fragment>
            <Grid container spacing={2} m={2}>
                <Grid item xs={9} >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            p: 0,
                            m: 0,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        <Box mr={2}> <Link to="/">Home</Link></Box>
                        <Box><Link to="/feature-flag">Feature flag</Link></Box>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                <Chip 
                    label={filteringLabel}
                    color={isLocalFiltering? 'primary':'success'}
                    variant="outlined"/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}  