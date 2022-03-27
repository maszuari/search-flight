import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchFlight, setIsNewSearch, setQuery, setShowFilterList, setFilterList } from '../../app/flightSlice';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getFlightsByNameStops } from '../../services/flight.service';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const getFilterList = (data) => {
    let arr = [];
    data.forEach((obj) => {
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            if (obj.AirlineName === arr[i].name) {
                found = true;
                break;
            }
        }
        if (!found) {
            let newElem = {
                name: obj.AirlineName.trim(),
                checked: true
            }
            arr.push(newElem);
        }
    });
    return arr;
}

export default function SearchBar() {

    const [name, setName] = useState("");
    const [stops, setStops] = useState(null);
    const [openAlert, setOpenAlert] = React.useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let strName = null;
        if (name) {
            strName = name.trim().toLowerCase()
        }

        if (!strName && !stops) {
            alert('Please enter Airline name and/or Number of stops field');
        } else {
            let query = {
                name: strName,
                stops: stops
            };
            dispatch(setQuery(query));

            getFlightsByNameStops(strName, stops)
                .then(data => {
                    console.log('newData ', data);
                    dispatch(searchFlight(data));
                    dispatch(setIsNewSearch(true));
                    if (data.length > 0) {
                        let filterList = getFilterList(data);
                        dispatch(setFilterList(filterList));
                        dispatch(setShowFilterList(true));
                    } else {
                        dispatch(searchFlight([]));
                        dispatch(setFilterList([]));
                        dispatch(setShowFilterList(false));
                        setOpenAlert(true);
                    }
                });
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    return (
        <React.Fragment>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} >
                        <TextField
                            error={false}
                            id="name"
                            label="Airline Name"
                            fullWidth
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        <TextField
                            error={false}
                            id="stops"
                            label="Number of Stops"
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={e => setStops(e.target.value)}
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={openAlert}
                onClose={handleClose}
                message="No results found"
                autoHideDuration={6000}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </React.Fragment>
    )
}